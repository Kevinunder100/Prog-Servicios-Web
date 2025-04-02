import { register as registerUser, getUser as getUsers, updateUser as updateUserDetails, deleteUser as deleteUserById } from '../services/user/user.js';

// Registrar usuario
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await registerUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener usuarios
export const getUser = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await updateUserDetails(id, name, email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await deleteUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
