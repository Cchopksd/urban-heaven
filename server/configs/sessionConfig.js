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
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.APP_ENV === 'production',
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    },
});



module.exports = { sessionConfig };