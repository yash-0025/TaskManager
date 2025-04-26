const Task = require("../models/Task");
const {validateObjectId} = require("../utils/validation");


exports.getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({user:req.user.id});
        res.status(200).json({tasks, status: true, msg:"Tasks Found Sucessfully"});
    }

    catch(err) {
        console.error(err)
        res.status(500).json({status: false, msg: "Internal Server Error"});
    }
}


exports.getTask = async(req, res) => {
    try{
        if(!validateObjectId(req.params.taskId)) {
            return res.status(400).json({status:false, msg:"Task id not valid"});
        }

        const task = await Task.findOne({ user:req.user.id, _id: req.params.taskId})
        if(!task) {
            return res.status(400).json({status: false, msg:"No Task Found"});
        }
        res.status(200).json({task, status:true, msg:"Task found sucessfully"});
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({status: false, msg:"Interanl Server Error"})
    }
}

exports.postTask = async(req,res) => {
    try{
        const {description} = req.body;
        if(!description) {
            return res.status(400).json({status:false, msg:"Description of task not found"});
        }
        const task = await Task.create({user:req.user.id, description});
        // console.log(task);
        res.status(200).json({task, status: true, msg:"Task created Sucessfully"});
    }

    catch(err) {
        console.error(err)
        return res.status(500).json({status:false, msg:"Internal Server Error"});
    }
}


exports.updateTask = async(req,res) => {
    try {
        const {description} = req.body;
        if(!description) {
            return res.status(400).json({status: false, msg:"No description found"})
        }
        if (!validateObjectId(req.params.taskId)) {
            return res.status(400).json({status: false, msg:"Task id not valid"});
        }

        let task = await Task.findById(req.params.taskId);
        if(!task) {
            return res.status(400).json({status: false, msg:"Task not found"})
        }

        if (task.user != req.user.id) {
            return res.status(403).json({status: false, msg:"You can update only task created by yourself"})
        }

        task = await Task.findById(req.params.taskId, {description}, {new: true});
        res.status(200).json({task, status: true, msg:"Task Updated Sucessfully"});
        
    } catch(err) {
        console.error(err)
        res.status(500).json({status: false, msg: "Internal Server Error"});
    }
}


exports.deleteTask = async (req, res) => {
    try {
        if (!validateObjectId(req.params.taskId)) {
            return res.status(400).json({status: false, msg:"Task Id not valid"})
        }

        let task = await Task.findById(req.params.taskId);
        if(!task) {
            return res.status(400).json({status: false, msg: "Task Id not found"});
        }

        if (task.user != req.user.id) {
            return res.status(403).json({status: false, msg: "You cannot delete this task it is someone else's task"})
        }

        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({status:true, msg:"Task deleted Seuccesfully"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({status: false, msg:"Internal Server Error"})
    }
} 