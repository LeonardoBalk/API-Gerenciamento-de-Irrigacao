// Rotas para gerenciamento de irrigação
const express = require('express');
const router = express.Router();
const irrigation = require('../controllers/irrigationController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);

router.get('/', irrigation.getAll);           
router.get('/:id', irrigation.getOne);        
router.post('/', irrigation.create);          
router.put('/:id', irrigation.update);        
router.delete('/:id', irrigation.delete);     

module.exports = router;
