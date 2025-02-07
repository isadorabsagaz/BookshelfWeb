const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


//MySQL connection
const mysql = require("mysql2");
require("dotenv").config();

// Configuração do banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Testando a conexão
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.stack);
        return;
    }
    console.log("Conectado ao banco de dados!");
});
