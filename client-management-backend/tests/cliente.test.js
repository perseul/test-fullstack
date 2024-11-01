const request = require('supertest');
const app = require('../src/server'); // Importar o app
const Cliente = require('../src/models/cliente');
const sequelize = require('../src/database/db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API de Clientes', () => {
  test('Deve listar clientes', async () => {
    const response = await request(app).get('/api/clientes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Deve cadastrar um novo cliente', async () => {
    const response = await request(app)
      .post('/api/clientes')
      .send({ 
        nome: 'João', 
        email: 'joao@example.com', 
        cpf: '12345678909', 
        telefone: '11987654321', 
        status: 'ativo' 
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('nome', 'João');
    expect(response.body).toHaveProperty('cpf', '12345678909');
  });

  test('Deve atualizar um cliente existente', async () => {
    const cliente = await Cliente.create({ 
      nome: 'Maria', 
      email: 'maria@example.com', 
      cpf: '98765432100', 
      telefone: '11912345678', 
      status: 'ativo' 
    });
    const response = await request(app)
      .put(`/api/clientes/${cliente.id}`)
      .send({ 
        nome: 'Maria Silva', 
        telefone: '11987654321' 
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Maria Silva');
  });

  test('Deve retornar 404 ao atualizar cliente inexistente', async () => {
    const response = await request(app).put('/api/clientes/999').send({ nome: 'Inexistente' });
    expect(response.status).toBe(404);
  });
});
