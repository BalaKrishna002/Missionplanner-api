const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

let tdata = null;
let messages = null;
let preflight = null;
let connect = "disconnect";
let waypoints = null;
let mode = 'Auto';

// POST endpoint for telemetry data
app.post("/tdata", (req, res) => {
    tdata = req.body;
    res.sendStatus(200); // Send a simple response to acknowledge receipt
});

// GET endpoint for telemetry data
app.get('/tdata-data', (req, res) => {
    if (tdata) {
        return res.status(200).json(tdata);
        
    } else {
        return res.status(404).json({ error: 'No data available' });
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
        return res.status(200).json(messages);
        
        
    } else {
        return res.status(404).json({ error: 'No data available' });
    }
});

// GET endpoint for preflight messages
app.get("/preflight-data",(req,res) =>{
    if(preflight){
        return res.status(200).json(preflight);
    }else {
        return res.status(404).json({ error: 'No data available' });
    }
})

// POST endpoint of preflight messages
app.post("/preflight",(req,res)=>{
    preflight = req.body;
    res.status(200).json({"message":"Data Recieved"});
})

// POST endpoint to connect
app.post("/connect",(req,res)=>{
    connect = req.body.status;
    res.status(200).json({"message":"Data Recieved"});
})

// GET endpoint to connect
app.get("/connect-data",(req,res) =>{
    // if(connect){
        return res.status(200).send(connect);
    // }else {
    //     return res.status(404).json({ error: 'No data available' });
    // }
})


// POST Request for waypoints
app.post("/waypoints",(req,res)=>{
    waypoints = req.body;
    res.status(200).json({"message":"Data recieved"});
})

//GET request for waypoints
app.get("/waypoints-data",(req,res)=>{
    if(waypoints) {
        res.status(200).json(waypoints);
    }else {
        res.status(404).json({ error: 'No data available' });
    }
})

app.post("/modes",(req,res)=>{
    mode = req.body.modes;
    res.status(200).json({"message":"Mode recieved"})
})

app.get("/modes-data",(req,res)=>{
    res.status(200).send(mode);
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
