const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/TodoModel");
require('dotenv').config();
const dbURI = process.env.DATABASE_URI;

const app = express();

app.use(express.json())

app.get("/" , (req,res)=>{
    res.send("Hello from Diya")
})

app.get("/todos",async(req, res)=>{
    try {
        const todos = await Task.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/todos/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await Task.findById(id);
        res.status(200).json(todo);
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }  
})

app.post("/todos",async(req,res)=>{
    try {
        const todo = await  Task.create(req.body)
        res.status(200).json(todo);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put("/todos/:id" , async(req, res)=>{
    try {
        const{id} = req.params;
        const todo = await Task.findByIdAndUpdate(id, req.body);
        if(!todo){
            return res.status(400).json({message: `Cannot find any task with ID ${id}`})
        }
        const updatedTodo = await User.findById(id);
        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Task.findByIdAndDelete(id);
        if(!todo){
            return res.status(400).json({message:`Cannot find any task with ID ${id}`})
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})

app.patch("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updatedTodo = await Task.findByIdAndUpdate(id, req.body);
        if (!updatedTodo) {
            return res.status(404).json({ message: `Cannot find any task with ID ${id}` });
        }
        res.status(200).json(updatedTodo);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose
.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to MongoDB")
    app.listen(3000, ()=>{
        console.log("NodeAPI is running on port 3000")
    });
})
.catch(()=>{
    console.log(error);
})