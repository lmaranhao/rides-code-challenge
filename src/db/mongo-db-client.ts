import { MongoClient } from 'mongodb';
import Ride from '../models/ride';

export default class MongoDBClient {
  private static mongoDbClient: any;

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

  public static async findRides(): Promise<Ride[]> {
    const mongoDb: any = await MongoDBClient.getMongoDb();
    const ridesCollection = mongoDb.collection('rides');
    let mongoResults: Ride[] = await ridesCollection.find({}).toArray();

    mongoResults = mongoResults.map((mongoRide: any) => {
      console.log(JSON.stringify(mongoRide));
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
