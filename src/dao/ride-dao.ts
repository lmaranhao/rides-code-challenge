import MongoDBClient from '../db/mongo-db-client';
import SqlDBClient from '../db/sql-db-client';
import Ride from '../models/ride';

export default class RideDao {
  public static async findRides(): Promise<Ride[]> {
    const sqlRides: Ride[] = await SqlDBClient.findRides();
    const mongoRides: Ride[] = await MongoDBClient.findRides();
    const totalRides = sqlRides.concat(mongoRides);
    return totalRides;
  }
}
