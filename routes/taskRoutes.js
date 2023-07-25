import express from "express";
import { addtask, deleteTask, getmytask, updatedTask } from "../controllers/taskControoler.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new',isAuthenticated ,addtask)
router.get('/mytask',isAuthenticated ,getmytask)
router.route('/:id').put(isAuthenticated,updatedTask).delete(isAuthenticated,deleteTask)


export default router;

