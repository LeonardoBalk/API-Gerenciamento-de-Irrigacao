const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users = require('../models/user'); // deve ser um array em memória
require('dotenv').config(); // só precisa estar uma vez no projeto

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = {
        id: uuidv4(),
        username,
        password: bcrypt.hashSync(password, 8)
    };

    users.push(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ token: null, message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

    return res.status(200).json({ id: user.id, username: user.username, token });
};
