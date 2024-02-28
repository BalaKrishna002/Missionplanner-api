const express = require("express");
const cors = require('cors');
const util = require('util');
const app = express();
const port = 4000;

app.use(express.json())
app.use(cors());

let data = null;

app.post("/data",(req,res)=>{
    data = req.body;
    //console.log(util.inspect(req.body.Target.input.groundspeed, { depth: null }));
    //console.log(req.body.Target.input.alt);
})

app.get('/', (req, res) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No data available' });
    }
  });


app.listen(port,()=>{
    console.log(`running on port:${port}`);
})