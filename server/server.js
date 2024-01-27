const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const { databaseConfig } = require('./configs/connectDB');
const { sessionConfig } = require('./configs/sessionConfig');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const merchantRoute = require('./routes/merchantRoute');
const { createTables } = require('./configs/createTables');

PORT = process.env.PORT || 5500;

const app = express();
app.use(sessionConfig);
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

const server = createServer(app);

databaseConfig.query('SELECT NOW()', (err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
	} else {
		console.log('Connected to the database.');
	}
});

createTables();

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	socket.on('send_message', (data) => {
		socket.broadcast.emit('receive_message', data);
	});
	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	});
});

app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', merchantRoute);

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
