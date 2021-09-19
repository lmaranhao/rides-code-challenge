import request from 'supertest';
import app from './app';
import MongoDBClient from './db/mongo-db-client';
import Ride from './models/ride';

describe('integration-test', () => {
  it('should return correct results from the 2 dbs', async () => {
    const response = await request(app).get('/rides');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(17);
    expect(response.body[0]).toHaveProperty('rideId');
    expect(response.body[0]).toHaveProperty('driverName');
    expect(response.body[0]).toHaveProperty('driverVehicle');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0].createdAt).toMatch(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/);
  });

  it('should get rides from mongodb', async () => {
    const rides: Ride[] = await MongoDBClient.findRides();
    expect(rides).toBeTruthy();
  });
});

beforeAll(async () => {
  await MongoDBClient.startMongodb();
});

afterAll(async () => {
  await MongoDBClient.stopMongodb();
});
