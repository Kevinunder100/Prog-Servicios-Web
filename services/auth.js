const UserModel = require("../models/User");
const { status } = require("http-status");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación de campos requeridos
    if (!name || !email || !password) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: "Todos los campos son obligatorios." });
    }

    // Verificar si el email ya existe
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(status.CONFLICT).json({ error: "El correo ya está registrado." });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

// Generar el JWT
const token = jwt.sign({ email:email }, process.env.JWT_SECRET, { expiresIn: '1y' });

    // Crear el nuevo usuario en la base de datos
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      token,
    });

    
    return res.status(status.CREATED).json({
      message: "Usuario registrado exitosamente.",
      user: { name, email },
      token, 
    });
  } catch (error) {
    console.error(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: "Error en el servidor." });
  }
};

module.exports = { register };
