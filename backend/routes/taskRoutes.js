const express = require("express");
const router = express.Router();

const {getTasks, getTask, postTask, updateTask, deleteTask} = require("../controllers/taskController");
const {verifyAccessToken} = require("../middlewares/index");

//*//  Routes Setup :: /api/tasks

router.get("/", verifyAccessToken, getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, updateTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);


module.exports = router;
