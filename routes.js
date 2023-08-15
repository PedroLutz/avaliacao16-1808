const express = require('express');
const router = express.Router();
const sequelize = require('./sequelize');
const Posts = require('./model/posts');
const Usuarios = require('./model/usuarios');
sequelize.sync();  
//GET Retorna dados com paginação e ordenação

//retorna posts
router.get('/posts', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM posts ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//retorna usuarios
router.get('/usuarios', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM usuarios ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//GET Consulta pelo ID

//consulta posts pelo id
router.get('/posts/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM posts WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "Postagem não encontrada",
            });
        } else {
            res.json({
                success: true,
                posts: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//consulta usuarios pelo id
router.get('/usuarios/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM usuarios WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        } else {
            res.json({
                success: true,
                usuario: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});


//POST Cria usuarios ou posts

//cria posts
router.post('/posts', async (req, res) => {
    sequelize.query(`INSERT INTO posts (titulo, conteudo, autor_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.titulo, req.body.conteudo, req.body.autor_id, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Post criado com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//cria usuarios
router.post('/usuarios', async (req, res) => {
    sequelize.query(`INSERT INTO usuarios (nome, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
        { replacements: [req.body.nome, req.body.email, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza dados pelo id

//atualiza titulo dos posts
router.put('/posts/:id', async (req, res) => {
    sequelize.query(`UPDATE posts SET titulo = ? WHERE id = ?`,
        { replacements: [req.body.titulo, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Post não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Post atualizado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//atualiza nome dos usuarios
router.put('/usuarios/:id', async (req, res) => {
    sequelize.query(`UPDATE usuarios SET nome = ? WHERE id = ?`,
        { replacements: [req.body.nome, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Usuário atualizado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//DELETE Deleta dados pelo ID

//deleta posts
router.delete('/posts/:id', async (req, res) => {
    sequelize.query(`DELETE FROM posts WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Postagem não encontrada",
            });
        } else {
            res.json({
                success: true,
                message: "Postagem deletada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//deleta usuarios
router.delete('/usuarios/:id', async (req, res) => {
    sequelize.query(`DELETE FROM usuarios WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Usuário deletado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

module.exports = router;
