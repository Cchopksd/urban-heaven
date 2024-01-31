const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const { databaseConfig } = require('./configs/connectDB');
const { sessionConfig } = require('./configs/sessionConfig');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const merchantRoute = require('./routes/merchantRoute');
const { createTables } = require('./configs/createTables');

PORT = process.env.PORT || 5500;

const app = express();
// const httpsOptions = {
// 	cert: fs.readFileSync('./private/ssl/urban-heaven_me.crt'),
// 	key: fs.readFileSync('./private/ssl/urban-heaven_me.key'),
// 	ca: fs.readFileSync('./private/ssl/urban-heaven_me.ca-bundle'),
// };

// const server = https.createServer(httpsOptions, (req, res) => {
// 	res.writeHead(200);
// 	res.end('Hello, HTTPS World!');
// });

if (process.env.APP_ENV === 'production') {
	app.set('trust proxy', 1);
}

const corsOptions = {
	origin: process.env.VITE_APP_API,
	credentials: true,
};

const swaggerOptions = {
	failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
		},
	},
	servers: [
		{
			url: 'http://localhost:5500',
		},
	],
	apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(sessionConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
app.get('/', (req, res) => {
	res.send('Hey this is my API running 🥳');
});

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
