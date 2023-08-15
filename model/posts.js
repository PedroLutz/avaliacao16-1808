const db = require("../sequelize");
const sequelize = require("sequelize");
const Usuarios = require('./usuarios');

//criação da tabela posts, com as linhas id, titulo, conteudo e autor_id
const Posts = db.define("posts", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: sequelize.STRING,
    conteudo: sequelize.STRING,
    autor_id: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
});
Posts.belongsTo(Usuarios, { foreignKey: 'autor_id' });
Posts.sync();

module.exports = Posts;