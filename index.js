// server.js

const express = require('express');
const net = require('net');
const cors = require("cors");

const app = express();

// Middleware to parse JSON data from requests
app.use(express.json());
app.use(cors());
let tdata = null;

// Create a TCP server using the net module
const tcpServer = net.createServer((socket) => {
    console.log('TCP client connected.');

    // Event listener for data received from TCP client
    socket.on('data', (data) => {
        const jsonData = data.toString('utf8');

        try {
        // Parse the JSON string to a JavaScript object
        const parsedData = JSON.parse(jsonData);
        tdata=parsedData;

        // Handle the parsed JSON data
        console.log(parsedData);
        } catch (error) {
        console.error('Error parsing JSON:', error);
        }
    });
});

// Start the Express server
const HTTP_PORT = 3000;
app.listen(HTTP_PORT, () => {
    console.log(`Express server is running on port ${HTTP_PORT}`);
});

// Start the TCP server
const TCP_PORT = 4000;
tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server is running on port ${TCP_PORT}`);
});

// Express route to handle incoming HTTP requests
app.get('/data', (req, res) => {
    console.log('Received JSON data from HTTP request:', tdata);
    res.status(200).json(tdata);
});


