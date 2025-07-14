// Rotas para o gerenciamento de pivôs de irrigação
const express = require('express');
const router = express.Router();
const pivot = require('../controllers/pivotController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);
router.get('/', pivot.getAll);
router.get('/:id', pivot.getOne);
router.post('/', pivot.create);
router.put('/:id', pivot.update);
router.delete('/:id', pivot.delete);

module.exports = router;
