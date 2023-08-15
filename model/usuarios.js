const db = require("../sequelize");
const sequelize = require("sequelize");

//criação da tabela usuarios, com as linhas nome e email
const Usuarios = db.define("usuarios", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: sequelize.STRING,
    email: sequelize.STRING,
});

Usuarios.sync();

module.exports = Usuarios;