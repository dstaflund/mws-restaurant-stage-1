
import { openDB, deleteDB, wrap, unwrap } from 'idb';

const dbName = 'mws-restaurant-db';
const dbVersion = 1;

export class DataProvider {

  static async openDatabase() {
    if (!('indexedDB' in window)) {
      return null;
    }

    const db = await openDB(dbName, dbVersion, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(oldVersion);
        console.log(transaction);
        console.log(db.objectStoreNames);
      },
    });
    return db;
  }
}
