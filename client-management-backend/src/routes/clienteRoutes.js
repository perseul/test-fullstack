const express = require('express');
const {
  listarClientes,
  cadastrarCliente,
  atualizarCliente,
} = require('../controllers/clienteController');

const router = express.Router();

router.get('/clientes', listarClientes);
router.post('/clientes', cadastrarCliente);
router.put('/clientes/:id', atualizarCliente);

module.exports = router;
