import express from "express";
import { getAllStudents, getStudentById, findStudent, createStudentById, updateStudentEmailById, deleteStudentById, deleteAllStudents } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/search", findStudent);
router.post("/", createStudentById);
router.patch("/:id", updateStudentEmailById);
router.delete("/:id", deleteStudentById);
router.delete("/", deleteAllStudents);

export default router;