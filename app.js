import express from "express";

import { getAllStudents, getStudent, createStudent } from "./config/database.connection.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to mySQL + Node.js + Express application." });
});

app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.send(students);
});

app.get('/student/:id', async (req, res) => {
    const id = req.params.id
    const student = await getStudent(id);
    res.send(student);
});

app.post("/student", async (req, res) => {
    const { id, firstName, lastName, email, password, enrollmentDate, dateOfBirth } = req.body;
    const student = await createStudent(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth);
    res.status(201).send.student;
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});