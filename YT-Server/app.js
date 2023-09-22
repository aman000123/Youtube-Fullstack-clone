const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const videoRouter = require('./routes/video');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/authentication');

const cors = require("cors")
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//mongo db url
const mongoDb = process.env.MONGO;

/*

//without .env file connect /////////////////////////////////////////////////////////

// Create a URL for the MongoDB

//const mongoDb = 'mongodb://127.0.0.1:27017/Youtube';


//jb collection==table ho tabhi show hoga mongodb me

//scheem se hi coonect karte hai  collection dikhne ke liye




// Connect to MongoDB using a promise

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });



*/



const connect = () => {
    mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to db");
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err);
        });
}



app.listen(4004, () => {
    connect(),
        console.log("Connected at 4004 port")
})


const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your client's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use error all over in catch blocks
app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Something got wrong !";

    return res.status(status).json({
        success: false,
        // status: status,
        status,
        // message: message
        message
    })
})

app.use('/', indexRouter);
app.use('/api/auths', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);


module.exports = app;
