// Controller para autenticação de usuários
// Esse controller lida com o registro e login de usuários, utilizando bcrypt para criptografia de
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users = require('../models/user'); 
require('dotenv').config(); 

// Registra um novo usuário
// Verifica se o usuário já existe e, se não, cria um novo usuário com senha
exports.register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = {
        id: uuidv4(), // Gera um ID único para o usuário
        username, // Nome de usuário
        password: bcrypt.hashSync(password, 8) // Criptografa a senha usando bcrypt
    };

    users.push(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
};

// Faz login do usuário
// Verifica se o usuário existe e se a senha está correta, retornando um token JWT
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
