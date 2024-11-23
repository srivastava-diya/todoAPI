const mongoose = require("mongoose")
const taskSchema = mongoose.Schema(
    {
        taskname:{
            type: String,
            required: [true, "Please Enter your task:"]
        },
        description:{
            type: String,
            required: [true, "Please provide a short task description:"]  
        },
        status:{
            type: String,
            required: [true, "What is the status pending/done :"],
        },
        tag:{
            type: String,
            required: [true, "Please Enter the type:"],
        },
        duedate:{
            type: Date,
            required: [true, "Please Enter the due date:"],
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;