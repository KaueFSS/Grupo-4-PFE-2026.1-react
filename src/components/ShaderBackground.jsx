import { useEffect, useRef } from 'react';

// ── Shader: plasma animado com paleta navy + dourado da ACBrasil ──
const vsSource = `
  attribute vec4 aVertexPosition;
  void main() { gl_Position = aVertexPosition; }
`;

const fsSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.12;
  const float gridSmoothWidth = 0.015;
  const float scale = 6.5;

  // ── Paleta ACBrasil (sutil, azul claro) ──
  const vec4 bgColor1  = vec4(0.020, 0.050, 0.110, 1.0);   // #050d1d navy escuro
  const vec4 bgColor2  = vec4(0.051, 0.106, 0.243, 1.0);   // #0d1b3e navy primário
  const vec4 lineColor = vec4(0.45,  0.62,  0.95, 1.0);    // azul claro sutil

  const float minLineWidth = 0.005;
  const float maxLineWidth = 0.08;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 8;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }
  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade   = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);
    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0
                 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      lines += line * lineColor * rand;
    }

    vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= 0.55 + verticalFade * 0.5;
    fragColor.a = 1.0;
    fragColor += lines * 0.18;                 // bem sutil — só uma respiração no fundo
    gl_FragColor = fragColor;
  }
`;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initShaderProgram(gl) {
  const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader link error:', gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

// fundo animado WebGL — preenche o container pai (precisa estar position:relative)
export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
    if (!gl) {
      console.warn('WebGL não suportado — fallback para gradiente CSS.');
      canvas.style.display = 'none';
      return;
    }

    const program = initShaderProgram(gl);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1, 1,  1, 1,
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aVertexPosition');
    const uRes = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.floor(rect.width * dpr));
      const h = Math.max(2, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId = null;
    let docVisible = !document.hidden;
    let onScreen = true;
    const inicio = Date.now();

    function frame() {
      rafId = null;
      if (!docVisible || !onScreen) return;
      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (Date.now() - inicio) / 1000);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      agendar();
    }
    function agendar() {
      if (rafId == null && docVisible && onScreen) rafId = requestAnimationFrame(frame);
    }

    const onVis = () => { docVisible = !document.hidden; agendar(); };
    document.addEventListener('visibilitychange', onVis);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      agendar();
    }, { threshold: 0 });
    io.observe(canvas);

    agendar();

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={`shader-bg ${className}`} aria-hidden="true" />;
}
