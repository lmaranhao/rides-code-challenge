import express, { NextFunction, Request, Response } from 'express';
import RideDao from './dao/ride-dao';
import Ride from './models/ride';

const app = express();
const port = 3000;

// eslint-disable-next-line no-unused-vars
app.get('/rides', async (request: Request, response: Response, next: NextFunction) => {
  const results: Ride[] = await RideDao.findRides();
  response.status(200).json(results);
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
