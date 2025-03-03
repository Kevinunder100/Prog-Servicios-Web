const express = require("express");
const router = express.Router();

// Definir rutas públicas
router.get("/", (req, res) => {
    res.send("Ruta pública funcionando!");
});

module.exports = router;