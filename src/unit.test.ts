import MongoDBClient from './db/mongo-db-client';
import SqlDBClient from './db/sql-db-client';
import Ride from './models/ride';
import RideDao from './dao/ride-dao';

jest.mock('./db/sql-db-client');
jest.mock('./db/mongo-db-client');

const mockedSqlDBClient = SqlDBClient as jest.Mocked<typeof SqlDBClient>;
const mockedMongoDBClient = MongoDBClient as jest.Mocked<typeof MongoDBClient>;

beforeAll(() => {
  const ridesFromSQL: Ride[] = [];
  ridesFromSQL.push(new Ride('1', 'Leonardo Silva', 'Ferrari 488', '2021-09-15T19:13:52.000Z'));
  ridesFromSQL.push(new Ride('2', 'John Galt', 'Ferrari F8', '2021-09-16T19:13:52.000Z'));
  ridesFromSQL.push(new Ride('3', 'Winston Smith', 'Ferrari 812', '2021-09-17T19:13:52.000Z'));
  mockedSqlDBClient.findRides.mockResolvedValue(ridesFromSQL);

  const ridesFromMongo: Ride[] = [];
  ridesFromMongo.push(new Ride('614516e824218f1184e0e3af', 'Inji Elnadi', 'Ferrari Portofino', '2021-09-15T19:13:52.000Z'));
  ridesFromMongo.push(new Ride('614516e824218f1184e0e3b0', 'Christian Reyes', 'Ferrari GTC4', '2021-09-16T19:13:52.000Z'));
  ridesFromMongo.push(new Ride('614516e824218f1184e0e3ad', 'Marsa Harisa', 'Ferrari 812', '2021-09-17T19:13:52.000Z'));
  mockedMongoDBClient.findRides.mockResolvedValue(ridesFromMongo);
});

describe('unit-test', () => {
  it('should ', async () => {
    const rides: Ride[] = await RideDao.findRides();
    expect(rides.length).toBe(6);
    expect(rides[0].rideId).toBe('1');
    expect(rides[5].rideId).toBe('614516e824218f1184e0e3ad');
  });
});
