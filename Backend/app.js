const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoute = require('./routes/captain.routes');
const mapsRoute = require('./routes/maps.routes');
const riderRoute = require('./routes/ride.routes');

// Connect to Database
connectToDatabase();

// CORS Configuration - Allows dynamic origin echoing for full Render & local dev compatibility
const corsOptions = {
  origin: function (origin, callback) {
    // allow all origins (including non-browser tools, render deployments, localhost)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Explicit preflight fallback middleware to guarantee headers on all environments
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => { 
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoute);
app.use('/maps', mapsRoute);
app.use('/rides', riderRoute);

module.exports = app;