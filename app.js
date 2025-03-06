const express=require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors({
  origin: ['https://chipper-monstera-a0011c.netlify.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const connectToDatabase=require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoute = require('./routes/captain.routes');
const cookieparser=require('cookie-parser');
const cookieParser = require('cookie-parser');
const mapsRoute=require('./routes/maps.routes');
const riderRoute = require('./routes/ride.routes');

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req, res) => {
  res.send('Hello World!');
})

app.use('/users', userRoutes);

app.use('/captains', captainRoute);
app.use('/maps', mapsRoute);
app.use('/rides', riderRoute);

module.exports =app;