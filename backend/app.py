from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import requests
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

app = Flask(__name__)
app.secret_key = "segredo_super_seguro"  # chave para sessões

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def supabase_headers():
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }

# ---------------- ROTAS HTML ----------------
@app.route("/")
def home():
    if "usuario" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        senha = request.form["senha"]

        # busca usuário no Supabase
        url = f"{SUPABASE_URL}/rest/v1/usuarios?email=eq.{email}"
        response = requests.get(url, headers=supabase_headers())
        data = response.json()

        if data:
            usuario = data[0]
            # se não tem senha definida, redireciona para primeiro acesso
            if not usuario.get("senha"):
                return redirect(url_for("primeiro_acesso", email=email))
            # valida senha
            if check_password_hash(usuario["senha"], senha):
                session["usuario"] = usuario
                return redirect(url_for("dashboard"))
            else:
                return render_template("login.html", erro="Senha incorreta")
        else:
            return render_template("login.html", erro="Usuário não encontrado")

    return render_template("login.html")

@app.route("/primeiro-acesso", methods=["GET", "POST"])
def primeiro_acesso():
    email = request.args.get("email")
    if request.method == "POST":
        senha = request.form["senha"]
        senha_hash = generate_password_hash(senha)

        # atualiza senha no Supabase
        url = f"{SUPABASE_URL}/rest/v1/usuarios?email=eq.{email}"
        data = {"senha": senha_hash}
        response = requests.patch(url, headers=supabase_headers(), json=data)

        if response.status_code in [200, 204]:
            return redirect(url_for("login"))
        else:
            return render_template("primeiro_acesso.html", erro="Erro ao criar senha", email=email)

    return render_template("primeiro_acesso.html", email=email)

@app.route("/logout")
def logout():
    session.pop("usuario", None)
    return redirect(url_for("login"))

@app.route("/dashboard")
def dashboard():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", usuario=session["usuario"])

@app.route("/usuarios")
def usuarios_page():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("usuarios.html")

@app.route("/chamados")
def chamados_page():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("chamados.html")

# ---------------- API USUÁRIOS ----------------
@app.route("/api/usuarios", methods=["GET"])
def listar_usuarios():
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/api/usuarios", methods=["POST"])
def criar_usuario():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- API CHAMADOS ----------------
@app.route("/api/chamados", methods=["GET"])
def listar_chamados():
    url = f"{SUPABASE_URL}/rest/v1/chamados"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/api/chamados", methods=["POST"])
def criar_chamado():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/chamados"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- API HISTÓRICO ----------------
@app.route("/api/historico", methods=["GET"])
def listar_historico():
    url = f"{SUPABASE_URL}/rest/v1/historico"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/api/historico", methods=["POST"])
def criar_historico():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/historico"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- MAIN ----------------
if __name__ == "__main__":
    app.run(debug=True)
