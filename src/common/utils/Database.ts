import { MongoClient } from 'mongodb';

const DB_NAME = 'animal-vet';
const DB_CONNECTION_STRING = 'mongodb://localhost:27017';
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export enum Collections {
  animals = 'animals',
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
