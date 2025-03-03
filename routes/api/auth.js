const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post("/register", async(req, res) =>{
    return "register created";
});

module.exports = router;