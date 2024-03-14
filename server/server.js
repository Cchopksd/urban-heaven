const express = require('express');
const { createServer } = require('https');
const fs = require('fs');
const { createServer: createHTTPServer } = require('http');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const { databaseConfig } = require('./configs/connectDB');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const merchantRoute = require('./routes/merchantRoute');
const imageRoute = require('./routes/imageRoute');
const addressRoute = require('./routes/addressRoute');
const { createTables } = require('./configs/createTables');

const app = express();
const httpsOptions = {
	cert: fs.readFileSync('./private/ssl/urban-heaven_me.crt'),
	ca: fs.readFileSync('./private/ssl/urban-heaven_me.ca-bundle'),
	key: fs.readFileSync('./private/ssl/private-key.key'),
};

if (process.env.APP_ENV === 'production') {
	app.set('trust proxy', 1);
}

const corsOptions = {
	origin: process.env.VITE_APP_API,
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const httpServer = createHTTPServer(app);
const httpsServer = createServer(httpsOptions, app);

databaseConfig.query('SELECT NOW()', (err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
	} else {
		console.log('Connected to the database.');
	}
});

createTables();

// const io = new Server(server, {
// 	cors: {
// 		origin: '*',
// 		methods: ['GET', 'POST'],
// 	},
// });

// io.on('connection', (socket) => {
// 	console.log(`⚡: ${socket.id} user just connected!`);
// 	socket.on('send_message', (data) => {
// 		socket.broadcast.emit('receive_message', data);
// 	});
// 	socket.on('disconnect', () => {
// 		console.log('🔥: A user disconnected');
// 	});
// });

app.use('/api', adminRoute);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', merchantRoute);
app.use('/api', imageRoute);
app.use('/api', addressRoute);

app.get('/', (req, res) => {
	res.send('Hey this is my API running 🥳');
});

// httpServer.listen(process.env.PORT, () => {
// 	console.log(`HTTP server listening on port ${process.env.PORT}`);
// });

const httpsPort = 8080;

httpsServer.listen(process.env.PORT, () => {
	console.log(`HTTPS server listening on port ${process.env.PORT}`);
});
