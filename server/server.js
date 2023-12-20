const express = require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const { databaseConfig } = require('./configs/connectDB')
const { sessionConfig } = require('./configs/sessionConfig');
const userRoute = require('./routes/userRoute')
const { authMiddleware } = require('./middlewares/authMiddleware')

PORT = process.env.PORT || 5500

// console.log(databaseConfig)

const app = express();
app.use(cors())
app.use(sessionConfig);
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

const server = createServer(app);

databaseConfig.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.')
    }
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

//Add this before the app.get() block
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('send_message', (data) => {
        socket.broadcast.emit("receive_message", data);
        console.log(data)
    });
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


app.use('/api', userRoute);


app.use('/protected', authMiddleware);



server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
