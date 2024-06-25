import * as spl from 'expo-sqlite';


const db = spl.openDatabaseSync('userDataBase.db');

export const createTable = async() => {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, age INTEGER);
    `);
}
