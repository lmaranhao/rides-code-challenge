import express, { NextFunction, Request, Response } from 'express';

import RideDao from './dao/ride-dao';
import Ride from './models/ride';

import MongoDBClient from './db/mongo-db-client';

const app = express();

// eslint-disable-next-line no-unused-vars
app.get('/rides', async (request: Request, response: Response, next: NextFunction) => {
  const results: Ride[] = await RideDao.findRides();
  response.status(200).json(results);
});

MongoDBClient.startMongodb().then((mongoUri) => {
  console.log(mongoUri);
  const port = 3000;
  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
  });
});

export default app;
