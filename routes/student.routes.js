import express from "express";
import { getAllStudents, getStudent, createStudent, deleteStudent, deleteAllStudents } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.delete("/", deleteAllStudents);

export default router;