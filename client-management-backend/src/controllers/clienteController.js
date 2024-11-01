const Cliente = require('../models/cliente');

// Listar todos os clientes
const listarClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

// Cadastrar um novo cliente
const cadastrarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar um cliente existente
const atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).send('Cliente não encontrado');
    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarClientes,
  cadastrarCliente,
  atualizarCliente,
};
