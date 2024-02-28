const express = require("express");
const cors = require('cors');
const util = require('util');
const app = express();
const port = 4000;

app.use(express.json())
app.use(cors());

let tdata = null;
let messages = null;

// // GET & POST api endpoint's for actual telemetry data
app.post("/tdata",(req,res)=>{
    tdata = req.body;
    //console.log(util.inspect(req.body.Target.input.groundspeed, { depth: null }));
    //console.log(req.body.Target.input.alt);
})

app.get('/tdata-data', (req, res) => {
  if (tdata) {
    res.status(200).json(tdata);
  } else {
    res.status(404).json({ error: 'No data available' });
  }
});


// GET & POST api endpoint's for messages
app.post("/messages",(req,res)=>{
  messages = req.body;
  console.log(req.body);
})

app.get("/message-data",(req,res)=>{
  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(404).json({ error: 'No data available' });
  }
})




app.listen(port,()=>{
    console.log(`running on port:${port}`);
})