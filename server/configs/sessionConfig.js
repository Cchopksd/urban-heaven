const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { databaseConfig } = require('./connectDB');

const sessionConfig = session({
    store: new pgSession({
        pool: databaseConfig,
        tableName: 'session',
        pruneSessionInterval: 300000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1day
        secure: process.env.NODE_ENV === 'production',
    },
});



module.exports = { sessionConfig };