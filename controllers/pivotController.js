// Esse código define o controlador para gerenciar os pivôs de irrigação.
// Ele permite criar, ler, atualizar e excluir pivôs associados a um usuário autenticado.
const { v4: uuidv4 } = require('uuid');
const pivots = require('../models/pivots');

// Retorna todas as pivôs de irrigação do usuário autenticado
exports.getAll = (req, res) => {
  res.json(pivots.filter(p => p.userId === req.userId));
}; 

// Retorna um pivô específico do usuário autenticado
exports.getOne = (req, res) => {
  const pivot = pivots.find(p => p.id === req.params.id && p.userId === req.userId);
  if (!pivot) return res.status(404).json({ message: 'Pivô não encontrado' });
  res.json(pivot);
};

// Cria um novo pivô de irrigação para o usuário autenticado
exports.create = (req, res) => {
  const { description, flowRate, minApplicationDepth } = req.body;
  if (!description || !flowRate || !minApplicationDepth) return res.status(400).json({ message: 'Não foram preenchidos todos os campos' });

  const pivot = {
    id: uuidv4(), // Gera um ID único para o pivô
    description, // Descrição do pivô
    flowRate, // Taxa de fluxo do pivô
    minApplicationDepth, // Profundidade mínima de aplicação do pivô
    userId: req.userId // ID do usuário autenticado
  };
  pivots.push(pivot);
  res.status(201).json({ message: 'Pivô criado com sucesso!', pivot });
};

// Atualiza um pivô de irrigação do usuário autenticado
exports.update = (req, res) => {
  const pivot = pivots.find(p => p.id === req.params.id && p.userId === req.userId);
  if (!pivot) return res.status(404).json({ message: 'Pivô não encontrado' });

  Object.assign(pivot, req.body);
  res.json({ message: 'Pivô atualizado com sucesso', pivot });
};

// Exclui um pivô de irrigação do usuário autenticado
exports.delete = (req, res) => {
  const index = pivots.findIndex(p => p.id === req.params.id && p.userId === req.userId);
  if (index === -1) return res.status(404).json({ message: 'Pivô não encontrado' });

  pivots.splice(index, 1);
  res.json({ message: 'Pivô excluído com sucesso' });
};
