const express = require("express");
const path = require("path");

const db = require("./db/conn");
const Mensagem = require("./Models/Mensagens");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/mensagens", (req, res) => {
    res.sendFile(path.join(__dirname, "mensagens.html"));
});

app.get("/mensagens.html", (req, res) => {
    res.sendFile(path.join(__dirname, "mensagens.html"));
});

app.get("/mensagens/api", async (req, res) => {
    try {
        const mensagens = await Mensagem.findAll({ order: [["id", "DESC"]] });
        res.json(mensagens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar mensagens." });
    }
});

app.post("/mensagens/add", async (req, res) => {
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
        return res.status(400).json({ error: "O texto é obrigatório." });
    }

    try {
        const novaMensagem = await Mensagem.create({ texto: texto.trim() });
        res.status(201).json(novaMensagem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao salvar mensagem." });
    }
});

app.put("/mensagens/:id", async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
        return res.status(400).json({ error: "O texto é obrigatório." });
    }

    try {
        const mensagem = await Mensagem.findByPk(id);

        if (!mensagem) {
            return res.status(404).json({ error: "Mensagem não encontrada." });
        }

        mensagem.texto = texto.trim();
        await mensagem.save();

        res.json(mensagem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar mensagem." });
    }
});

app.delete("/mensagens/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const mensagem = await Mensagem.findByPk(id);

        if (!mensagem) {
            return res.status(404).json({ error: "Mensagem não encontrada." });
        }

        await mensagem.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir mensagem." });
    }
});

(async () => {
    try {
        await db.sync();
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco:", error);
        process.exit(1);
    }
})();