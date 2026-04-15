from flask import Flask, request, jsonify, render_template
import requests
import os
from dotenv import load_dotenv

# Carregar variáveis do .env
load_dotenv()

app = Flask(__name__)

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
    return render_template("index.html")

# ---------------- ROTAS USUÁRIOS ----------------
@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/usuarios", methods=["POST"])
def criar_usuario():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- ROTAS CHAMADOS ----------------
@app.route("/chamados", methods=["GET"])
def listar_chamados():
    url = f"{SUPABASE_URL}/rest/v1/chamados"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/chamados", methods=["POST"])
def criar_chamado():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/chamados"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- ROTAS HISTÓRICO ----------------
@app.route("/historico", methods=["GET"])
def listar_historico():
    url = f"{SUPABASE_URL}/rest/v1/historico"
    response = requests.get(url, headers=supabase_headers())
    return jsonify(response.json())

@app.route("/historico", methods=["POST"])
def criar_historico():
    data = request.json
    url = f"{SUPABASE_URL}/rest/v1/historico"
    response = requests.post(url, headers=supabase_headers(), json=data)
    return jsonify(response.json())

# ---------------- MAIN ----------------
if __name__ == "__main__":
    app.run(debug=True)
