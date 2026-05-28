import subprocess
import sys
import os
import time
import webbrowser
import shutil
import threading

# ─────────────────────────────────────────
#  Configurações
# ─────────────────────────────────────────
URL       = "http://localhost:5173"
PASTA     = os.path.dirname(os.path.abspath(__file__))
WINDOWS   = sys.platform == "win32"

COR_OK    = "\033[92m"   # verde
COR_ERRO  = "\033[91m"   # vermelho
COR_INFO  = "\033[94m"   # azul
COR_WARN  = "\033[93m"   # amarelo
COR_RESET = "\033[0m"

def ok(msg):   print(f"  {COR_OK}✔  {msg}{COR_RESET}")
def erro(msg): print(f"  {COR_ERRO}✘  {msg}{COR_RESET}"); sys.exit(1)
def info(msg): print(f"  {COR_INFO}➜  {msg}{COR_RESET}")
def warn(msg): print(f"  {COR_WARN}⚠  {msg}{COR_RESET}")

def rodar(cmd, **kwargs):
    """Roda um comando de forma compatível com Windows."""
    return subprocess.run(cmd, shell=WINDOWS, **kwargs)

print()
print(f"  {'─'*46}")
print(f"  {'Grupo 4 PFE 2026.1 — Inicializador':^46}")
print(f"  {'─'*46}")
print()

# ─────────────────────────────────────────
#  1. Verifica Node.js
# ─────────────────────────────────────────
info("Verificando Node.js...")
if not shutil.which("node"):
    erro("Node.js não encontrado! Instale em https://nodejs.org (versão 18+)")

resultado = rodar(["node", "-v"], capture_output=True, text=True)
versao_node = resultado.stdout.strip()
try:
    major = int(versao_node.lstrip("v").split(".")[0])
    if major < 18:
        erro(f"Node.js {versao_node} é muito antigo. Instale a versão 18 ou superior.")
    ok(f"Node.js {versao_node}")
except ValueError:
    warn(f"Não foi possível verificar versão do Node ({versao_node}), continuando...")

# ─────────────────────────────────────────
#  2. Verifica npm
# ─────────────────────────────────────────
info("Verificando npm...")
if not shutil.which("npm"):
    erro("npm não encontrado! Reinstale o Node.js de https://nodejs.org")

resultado = rodar(["npm", "-v"], capture_output=True, text=True)
ok(f"npm v{resultado.stdout.strip()}")

# ─────────────────────────────────────────
#  3. Garante que está na pasta certa
# ─────────────────────────────────────────
os.chdir(PASTA)

# ─────────────────────────────────────────
#  4. Verifica node_modules
# ─────────────────────────────────────────
info("Verificando dependências do projeto...")
node_modules = os.path.join(PASTA, "node_modules")

if not os.path.isdir(node_modules):
    warn("node_modules não encontrado — rodando 'npm install'...")
    print()
    resultado = rodar(["npm", "install"], cwd=PASTA)
    if resultado.returncode != 0:
        erro("Falha ao instalar dependências. Veja o erro acima.")
    print()
    ok("Dependências instaladas com sucesso!")
else:
    pkg        = os.path.join(PASTA, "package.json")
    lock       = os.path.join(PASTA, "package-lock.json")
    mtime_pkg  = os.path.getmtime(pkg)  if os.path.exists(pkg)  else 0
    mtime_lock = os.path.getmtime(lock) if os.path.exists(lock) else 0

    if mtime_pkg > mtime_lock:
        warn("package.json foi modificado — rodando 'npm install' para atualizar...")
        print()
        resultado = rodar(["npm", "install"], cwd=PASTA)
        if resultado.returncode != 0:
            erro("Falha ao atualizar dependências. Veja o erro acima.")
        print()
        ok("Dependências atualizadas!")
    else:
        ok("Dependências já instaladas e atualizadas!")

# ─────────────────────────────────────────
#  5. Abre o navegador após pequeno delay
# ─────────────────────────────────────────
def abrir_navegador():
    time.sleep(2.5)
    webbrowser.open(URL)

threading.Thread(target=abrir_navegador, daemon=True).start()

# ─────────────────────────────────────────
#  6. Inicia o servidor de desenvolvimento
# ─────────────────────────────────────────
print()
info(f"Iniciando servidor em {URL} ...")
print(f"  {COR_WARN}(pressione Ctrl+C para encerrar){COR_RESET}")
print()

try:
    rodar(["npm", "run", "dev"], cwd=PASTA)
except KeyboardInterrupt:
    print()
    ok("Servidor encerrado. Até logo!")
    print()
