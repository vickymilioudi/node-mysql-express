import { pool } from "../config/database.connection.js";

export async function getAllStudentsModel() {
  const [rows] = await pool.query("SELECT * FROM student");
  return rows;
};

export async function getStudentModel(id) {
  const [rows] = await pool.query("SELECT * FROM student WHERE id = ?", [id]);
  return rows[0];
};

export async function createStudentModel(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) {
  const [result] = await pool.query(
    "INSERT INTO student (id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) VALUES (?, ?, ?, ?, ?, ?, ?)", 
    [id, firstName, lastName, email, password, enrollmentDate, dateOfBirth]);
  return getStudentModel(id);
};

export async function deleteStudentModel(id) {
  const [result] = await pool.query("DELETE FROM student WHERE id = ?", [id]);
  return result;
}

export async function deleteAllStudentsModel() {
  const [result] = await pool.query("DELETE FROM student");
  return result;
}