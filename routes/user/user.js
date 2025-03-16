// routes/user/user.js

const express = require('express');
const router = express.Router();
const user = require('../../services/user/user'); 

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await user.getAllUsers(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar usuario por ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await user.updateUser(id, req.body); 
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar usuario por ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await user.deleteUser(id); 
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
