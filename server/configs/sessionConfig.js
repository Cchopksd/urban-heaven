const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const crypto = require('crypto');
const { databaseConfig } = require('./connectDB');

const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);

const sessionConfig = session({
    store: new pgSession({
        pool: databaseConfig,
        tableName: 'session',
        pruneSessionInterval: (60 * 10),
    }),
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 10 },
});


module.exports = { sessionConfig };