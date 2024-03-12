const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

let tdata = "Mission Disarmed/Not yet Started!";
let messages = "Mission Disarmed/Not yet Started!";
let waypoints = null;

// POST endpoint for telemetry data
app.post("/tdata", (req, res) => {
    tdata = req.body;
    res.sendStatus(200); // Send a simple response to acknowledge receipt
});

// GET endpoint for telemetry data
app.get('/tdata-data', (req, res) => {
    if (tdata) {
        if(tdata.Target.input.prearmstatus) res.status(200).json(tdata);
        else {
            //console.log("Mission Disarmed/Not yet Started!");
            setTimeout(() => {
                tdata.m_StringValue = "Mission Disarmed/Not yet Started!";
                //console.log(myVariable); // This will be executed after 3 seconds
            }, 1000*60*60);
            res.status(200).json({"message":tdata});
        }
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
        if(tdata.Target.input.prearmstatus) res.status(200).json(messages);
        else {
            //console.log("Mission Disarmed/Not yet Started!");
            setTimeout(() => {
                messages.m_StringValue = "Mission Disarmed/Not yet Started!";
                //console.log(myVariable); // This will be executed after 3 seconds
            }, 1000*60*60);
            res.status(200).json({"message":messages});
        }
        
    } else {
        res.status(404).json({ error: 'No data available' });
    }
});


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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
