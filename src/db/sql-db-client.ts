import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import Ride from '../models/ride';

export default class SqlDBClient {
    private static sqlDbClient: any;

    private static async getSqlDb(): Promise<any> {
      if (!SqlDBClient.sqlDbClient) {
        SqlDBClient.sqlDbClient = await open({
          filename: path.join(__dirname, '..', 'db', 'rides.db'),
          driver: sqlite3.Database,
        });
      }
      return SqlDBClient.sqlDbClient;
    }

    public static async findRides(): Promise<Ride[]> {
      try {
        const db: any = await SqlDBClient.getSqlDb();
        const sqlResults: Ride[] = await db.all('select CAST(rideId as varchar) as rideId, driverName, driverVehicle, strftime("%Y-%m-%dT%H:%M:%fZ", created) as createdAt from Rides');
        return sqlResults;
      } catch (e) {
        console.log(e);
        return [];
      }
    }
}
