const { databaseConfig } = require('./connectDB')

exports.createTableIfNotExists = async (tableName, tableQuery) => {
    try {
        const checkTable = `SELECT to_regclass('${tableName}')`;
        const result = await databaseConfig.query(checkTable);

        if (!result.rows[0].to_regclass) {
            await databaseConfig.query(tableQuery)
            console.log(`${tableName} table created successfully`)
        }
        // else {
        //     console.log(`${tableName} table already exists`);
        // }
    } catch (err) {
        console.error(`Error creating ${tableName} table:`, err);
    }
}

const userTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
        user_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_fname VARCHAR(255) NOT NULL,
        user_lname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_phone VARCHAR(10) NOT NULL,
        user_gender VARCHAR(255) NOT NULL,
        user_date INTEGER NOT NULL,
        user_month INTEGER NOT NULL,
        user_year INTEGER NOT NULL
    );
`;

const sessionTableQuery = `
    CREATE TABLE session(
        sid varchar NOT NULL,
        sess json NOT NULL,
        expire timestamp with time zone NOT NULL,
        PRIMARY KEY(sid)
    );
`;

exports.createTables = async () => {
    await this.createTableIfNotExists('users', userTableQuery)
    await this.createTableIfNotExists('session', sessionTableQuery)
};