const express = require('express');
const { createServer: createHTTPServer } = require('http');
const { createServer } = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const { databaseConfig } = require('./configs/connectDB');
const { createTables } = require('./configs/createTables');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const merchantRoute = require('./routes/merchantRoute');
const imageRoute = require('./routes/imageRoute');
const addressRoute = require('./routes/addressRoute');
const getOmiseTokenRoute = require('./routes/getOmiseTokenRoute');

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

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

databaseConfig.query('SELECT NOW()', (err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
	} else {
		console.log('Connected to the database.');
	}
});

createTables();

const HTTPServer = createHTTPServer(httpsOptions, app);

const wss = new WebSocket.Server({ server: HTTPServer });

wss.on('connection', (ws) => {
	console.log('Client connected to WebSocket.');

	// WebSocket message handler
	ws.on('message', (message) => {
		console.log(`Received message from client: ${message}`);
		// Handle message from client
	});

	// WebSocket close handler
	ws.on('close', () => {
		console.log('Client disconnected from WebSocket.');
	});
});


app.use('/api', adminRoute);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', merchantRoute);
app.use('/api', imageRoute);
app.use('/api', addressRoute);
app.use('/api', getOmiseTokenRoute);

app.get('/', (req, res) => {
	res.send('Hey this is my API running 🥳');
});

HTTPServer.listen(process.env.PORT, () => {
	console.log(`HTTP server listening on port ${process.env.PORT}`);
});
