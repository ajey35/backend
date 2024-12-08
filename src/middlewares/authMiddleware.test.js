// src/middleware/authMiddleware.test.js
import request from 'supertest'; // Assuming you're using supertest for integration testing
import app from '../app'; // Your Express app

describe('Authentication Middleware', () => {
  let token;

  beforeAll(async () => {
    // Here you would create a user and get their token for testing
    const response = await request(app).post('/api/users/login').send({ username: 'testUser', password: 'password' });
    token = response.body.token;
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/api/donations');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('No token provided, authorization denied');
  });

  it('should return 200 if a valid token is provided', async () => {
    const response = await request(app)
      .get('/api/donations')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});
