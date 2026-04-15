from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="sua_senha",
    database="servicedesk_avp"
)

cursor = db.cursor(dictionary=True)

# Criar chamado
@app.route('/api/chamados', methods=['POST'])
def criar_chamado():
    data = request.json
    cursor.execute(
        "INSERT INTO chamados (titulo, descricao, criado_por) VALUES (%s, %s, %s)",
        (data['titulo'], data['descricao'], data['criado_por'])
    )
    db.commit()
    return jsonify({"message": "Chamado criado com sucesso"}), 201

# Listar chamados
@app.route('/api/chamados', methods=['GET'])
def listar_chamados():
    cursor.execute("SELECT * FROM chamados")
    chamados = cursor.fetchall()
    return jsonify(chamados)

# Atualizar chamado (atribuir ou mudar status)
@app.route('/api/chamados/<int:id>', methods=['PUT'])
def atualizar_chamado(id):
    data = request.json
    cursor.execute(
        "UPDATE chamados SET status=%s, atribuido_para=%s WHERE id=%s",
        (data['status'], data['atribuido_para'], id)
    )
    db.commit()
    return jsonify({"message": "Chamado atualizado com sucesso"})
