// Controller para gerenciar as operações de irrigação
const { v4: uuidv4 } = require('uuid');
const irrigations = require('../models/irrigations');
const pivots = require('../models/pivots');

// Retorna todas as irrigacões do usuário autenticado
exports.getAll = (req, res) => {
  res.json(irrigations.filter(i => i.userId === req.userId));
};

// Retorna uma irrigação específica do usuário autenticado
exports.getOne = (req, res) => {
  const irr = irrigations.find(i => i.id === req.params.id && i.userId === req.userId);
  if (!irr) return res.status(404).json({ message: 'Irrigação não encontrada' });
  res.json(irr);
};

// Cria uma nova irrigação associada a um pivô do usuário autenticado
// Verifica se o pivô existe e se pertence ao usuário autenticado
exports.create = (req, res) => {
  const { pivotId, applicationAmount, irrigationDate } = req.body;
  const pivot = pivots.find(p => p.id === pivotId && p.userId === req.userId);
  if (!pivot) return res.status(400).json({ message: 'Pivô inválido' });

  const irr = {
    id: uuidv4(), // Gera um ID único para a irrigação
    pivotId, // ID do pivô associado
    applicationAmount, // Quantidade de água aplicada
    irrigationDate, // Data da irrigação
    userId: req.userId // ID do usuário autenticado
  };
  irrigations.push(irr);
  res.status(201).json({ message: 'Irrigação registrada com sucesso', irrigation: irr });
};

// Atualiza uma irrigação do usuário autenticado
// Permite atualizar a quantidade de água aplicada e a data da irrigação
exports.update = (req, res) => {
  const irr = irrigations.find(i => i.id === req.params.id && i.userId === req.userId);
  if (!irr) return res.status(404).json({ message: 'Irrigação não encontrada' });

  const { applicationAmount, irrigationDate } = req.body;

  if (applicationAmount !== undefined) irr.applicationAmount = applicationAmount;
  if (irrigationDate !== undefined) irr.irrigationDate = irrigationDate;

  res.json({ message: 'Irrigação atualizada com sucesso', irrigation: irr });
};

// Exclui uma irrigação do usuário autenticado
exports.delete = (req, res) => {
  const index = irrigations.findIndex(i => i.id === req.params.id && i.userId === req.userId);
  if (index === -1) return res.status(404).json({ message: 'Irrigação não encontrada' });

  irrigations.splice(index, 1);
  res.json({ message: 'Irrigação excluída com sucesso' });
};
