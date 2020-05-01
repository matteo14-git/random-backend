"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const DB_NAME = 'animal-vet';
const DB_CONNECTION_STRING = 'mongodb://localhost:27017';
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
var Collections;
(function (Collections) {
    Collections["animals"] = "animals";
})(Collections = exports.Collections || (exports.Collections = {}));
exports.getCollection = (collection) => {
    return Database.client.db(DB_NAME).collection(collection);
};
class Database {
    static connect() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(DB_CONNECTION_STRING, connectionOptions, (err, client) => {
                if (err)
                    return reject(err);
                Database.client = client;
                resolve(client);
            });
        });
    }
    static disconnect() {
        Database.client.close();
    }
}
exports.Database = Database;
