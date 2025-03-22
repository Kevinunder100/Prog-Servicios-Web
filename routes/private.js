const express = require('express');
const router = express.Router();
require('dotenv').config();

const userRouter = require('../services/user/user');
router.use( process.env.BASE_URL, userRouter );

module.exports = router;