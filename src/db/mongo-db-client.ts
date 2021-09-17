import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import Ride from '../models/ride';

export default class MongoDBClient {
  private static mongoDbClient: any;

  private static mongod: any;

  private static async getMongoDb(): Promise<any> {
    if (!MongoDBClient.mongoDbClient) {
      const url = 'mongodb://localhost:27017';
      const client = new MongoClient(url);
      const dbName = 'rides';
      await client.connect();
      MongoDBClient.mongoDbClient = client.db(dbName);
    }
    return MongoDBClient.mongoDbClient;
  }

  public static async stopMongodb(): Promise<void> {
    MongoDBClient.mongod.stop();
  }

  public static async startMongodb(): Promise<string> {
    MongoDBClient.mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
      },
    });

    const mongoDb: any = await MongoDBClient.getMongoDb();
    mongoDb.createCollection('rides');
    const ridesCollection = mongoDb.collection('rides');
    await ridesCollection.insertMany([
      { driver: { name: 'Tiger Woods', vehicle: 'Genesis GV80' }, createdAt: { $date: '2021-09-13T00:00:03.330Z' } },
      { driver: { name: 'Serena Williams', vehicle: 'Lincoln Navigator' }, createdAt: { $date: '2021-09-14T00:00:01.938Z' } },
      { driver: { name: 'Maria Sharapova', vehicle: 'Porsche Panamera GTS' }, createdAt: { $date: '2021-09-14T00:00:01.427Z' } },
      { driver: { name: 'Tatiana Weston-Webb', vehicle: 'Nissan Super Sport' }, createdAt: { $date: '2021-07-14T00:04:04.879Z' } },
      { driver: { name: 'Maya Gabeira', vehicle: 'Mitsubishi Eclipse Cross' }, createdAt: { $date: '2021-09-15T00:00:01.341Z' } },
      { driver: { name: 'Michael Phelps', vehicle: 'Cadillac Escalade' }, createdAt: { $date: '2021-08-11T04:00:01.456Z' } },
      { driver: { name: 'Jesus Christ', vehicle: 'Heaven X' }, createdAt: { $date: '2021-09-13T00:00:03.345Z' } },
      { driver: { name: 'Lionel Messi', vehicle: 'Ferrari 335 Sport Spider Scaglietti' }, createdAt: { $date: '2021-09-15T03:03:02.245Z' } }]);

    return MongoDBClient.mongod.getUri();
  }

  public static async findRides(): Promise<Ride[]> {
    const mongoDb: any = await MongoDBClient.getMongoDb();
    const ridesCollection = mongoDb.collection('rides');
    let mongoResults: Ride[] = await ridesCollection.find({}).toArray();

    mongoResults = mongoResults.map((mongoRide: any) => {
      const ride: Ride = new Ride(
        // eslint-disable-next-line no-underscore-dangle
        mongoRide._id,
        mongoRide.driver.name,
        mongoRide.driver.vehicle,
        mongoRide.createdAt,
      );
      return ride;
    });
    return mongoResults;
  }
}
