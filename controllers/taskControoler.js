import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskodels.js";
// import { User } from "../models/usermodes.js";

export const addtask = async (req, res, next) => {
  try {
    console.log('working 1');
    const { title, description } = req.body;
  
    await Task.create({ title, description, user: req.user });

    res.status(201).json({
    
      success: true,
      message: "task created successfully",
    });
    console.log('woeking2')
  } catch (error) {
    console.log(error);
  }
};

export const getmytask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updatedTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("invalid id", 404));

    task.isCompleted = !task.isCompleted;
    task.save();
    res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("invalid id", 404));

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
