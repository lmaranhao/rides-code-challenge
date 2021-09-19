import express, { NextFunction, Request, Response } from 'express';

import { Server } from 'http';
import RideDao from './dao/ride-dao';
import MongoDBClient from './db/mongo-db-client';
import Ride from './models/ride';

const app = express();

// eslint-disable-next-line no-unused-vars
app.get('/rides', async (request: Request, response: Response, next: NextFunction) => {
  console.log('/rides');
  const results: Ride[] = await RideDao.findRides();
  response.status(200).json(results);
});

export default app;

// this is to avoid 2 things
// TCPSERVERWRAP with the supertest package used in integration tests when we call the app.listen
// and to force mongo to start before the tests are executed I needed to call it from the beforeAll
if (process.argv[2] === 'start-mongo') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
  });
  MongoDBClient.startMongodb().then((mongoUri) => {
    console.log(mongoUri);
  });
}
