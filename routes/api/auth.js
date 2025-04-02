const express = require('express');
const router = express.Router();
const authService = require('../../services/auth');
const { where } = require('sequelize');
require('dotenv').config();

router.post("register"),
  async(req, res) =>{
    try {
        const user = await authService.register(req, res);
        return res.status(201).json(user);
      } catch (exception) {
        return res.status(500);
      }
};

module.exports = router;
