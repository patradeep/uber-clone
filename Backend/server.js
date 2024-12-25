const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket'); // Import the initializeSocket function
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize the socket connection
const io = initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});