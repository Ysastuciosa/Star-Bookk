const { DataTypes } = require("sequelize");
const db = require("../db/conn");


const Mensagens = db.define("Mensagens", {
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


module.exports = Mensagens;
