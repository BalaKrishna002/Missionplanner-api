const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

let tdata = null;
let messages = null;

// POST endpoint for telemetry data
app.post("/tdata", (req, res) => {
    tdata = req.body;
    res.sendStatus(200); // Send a simple response to acknowledge receipt
});

// GET endpoint for telemetry data
app.get('/tdata-data', (req, res) => {
    if (tdata) {
        res.status(200).json(tdata);
    } else {
        res.status(404).json({ error: 'No data available' });
    }
});

// POST endpoint for messages
app.post("/messages", (req, res) => {
    messages = req.body;
    res.sendStatus(200); // Send a simple response to acknowledge receipt
});

// GET endpoint for messages
app.get("/messages-data", (req, res) => {
    if (messages) {
        res.status(200).json(messages);
    } else {
        res.status(404).json({ error: 'No data available' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
