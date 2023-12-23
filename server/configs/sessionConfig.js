const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const crypto = require('crypto');
const { databaseConfig } = require('./connectDB');

// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);

const sessionConfig = session({
    store: new pgSession({
        pool: databaseConfig,
        tableName: 'session',
        pruneSessionInterval: 300000,
    }),
    secret: 'asdfsdfadfas',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
});



module.exports = { sessionConfig };