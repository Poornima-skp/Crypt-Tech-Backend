// Imports
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors')


// const postRoutes = './routes/Posts'

const app = express();
const PORT = process.env.PORT || 8080

// Middleware
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// ROUTES
app.use('/posts', require('./routes/Posts'));


// Mongoose Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Express app running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}.`)
})



