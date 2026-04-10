const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  test('responde 200 y el texto esperado', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hola desde la app de demostración');
  });
});

describe('GET /saludo/:nombre', () => {
  test('incluye el nombre en la respuesta', async () => {
    const response = await request(app).get('/saludo/Ana');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hola, Ana');
  });
});
