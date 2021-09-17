import request from 'supertest';
import app from './app';
import MongoDBClient from './db/mongo-db-client';

describe('integration testing', () => {
  it('should ', async () => {
    const response = await request(app).get('/rides');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(17);
  });
});

afterAll(async () => {
  await MongoDBClient.stopMongodb();
});
