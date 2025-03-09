const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require('./api/auth');
const userRouter = require('./user/user');
router.use( process.env.BASE_URL, authRouter );
router.use( process.env.BASE_URL, userRouter );

module.exports = router;