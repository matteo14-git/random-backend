import { MongoClient } from 'mongodb';

const { DB_NAME = '', DB_CONNECTION_STRING = '' } = process.env;

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export enum Collections {
  animals = 'animals',
  doctors = 'doctors',
  stops = 'stops',
  stats = 'stats',
  trips = 'trips',
  temp = 'temp',
}

export const getCollection = (collection: Collections) => {
  return Database.client.db(DB_NAME).collection(collection);
};

export class Database {
  static client: MongoClient;

  static connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      MongoClient.connect(
        DB_CONNECTION_STRING,
        connectionOptions,
        (err, client) => {
          if (err) return reject(err);

          Database.client = client;
          resolve(client);
        }
      );
    });
  }

  static disconnect(): void {
    Database.client.close();
  }
}
