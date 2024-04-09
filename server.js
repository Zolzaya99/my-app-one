// Get dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS middleware
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist/my-app-one/browser/')));

// Import routing files
// const index = require('./server/routes/app');
const eventRoutes = require('./server/routes/events');

// API routes
// app.use('/', index);
app.use('/api/events', eventRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://zolzayaoyunkhand:Mongolia99@cluster0.n9tfwsa.mongodb.net/event-planner?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/my-app-one/browser/index.html'));
  console.log("server connected")
});

// Define port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on port
server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});
