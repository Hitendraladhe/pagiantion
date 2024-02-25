const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./conn')
const Emps = require("./empo");
const port = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/empo", async(req, res)=>{
    try {
      console.log("hello Home get");
      const ress = await Emps.find()
      res.send(ress)
    } catch (error) {
       res.status(500).send(error)     
    }
});

app.post("/empo", async (req, res)=>{
    try{
        const createdData = await new Emps(req.body);
        if(!req.body){
            res.status(404).send(error)  
        }
        createdData.save();
        console.log("hello Home post");
        res.send(createdData)
    }catch(e){
        res.status(500).send(error)  
    }
});


app.patch("/empo/:id", async (req, res)=>{
    const id= req.params.id
    try{
        const existData = await Emps.findById(id,);
        if(!existData){
            res.status(404).send(error)  
        }
        const updatedData = await Emps.findByIdAndUpdate(id, req.body);
        updatedData.save();
        console.log("hello Home Put");
        res.send(updatedData)
    }catch(e){
        res.status(500).send(error)  
    }
});

app.get("/empo/one/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const getOne = await Emps.findOne(id)
        res.send(getOne);
    } catch (error) {
        res.status(500).send(error) 
    }
})

app.get("/empo/months", async(req, res)=>{
   //const months = req.params.month  
   try {
    const startDate = new Date(Date.UTC(2021, 1 - 1, 1));
        const endDate = new Date(Date.UTC(2021, 1, 31, 23, 59, 59));
    const laps = await Emps.find({ dateOfSale: { $gte: startDate, $lte: endDate } });
    const getFullYear = Emps.find({dateOfSale: "%__%"});
    res.send(getFullYear);
    console.log(laps)
   } catch (error) {
     res.send(error)
     console.log(error) 
   }
})

app.listen(port, ()=>{
    console.log(`server running at : ${port}`);
});