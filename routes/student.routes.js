import express from "express";
import { getAllStudentsController, getStudentByIdController, findStudentController,
         createStudentByIdController, updateStudentEmailByIdController, deleteStudentByIdController, 
         deleteAllStudentsController, getStudentsByCourseController} 
from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudentsController);
router.get("/search", findStudentController);
router.get("/:id", getStudentByIdController);
router.post("/", createStudentByIdController);
router.patch("/:id", updateStudentEmailByIdController);
router.delete("/:id", deleteStudentByIdController);
router.delete("/", deleteAllStudentsController);

router.get("/course/:courseID/", getStudentsByCourseController);
export default router;