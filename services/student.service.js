import { pool } from "../config/database.connection.js";

export async function getAllStudentsQuery() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM student, course, attends
    ORDER BY lastName`);
  return rows;
};

export async function getStudentByIdQuery(id) {
  const [rows] = await pool.query("SELECT * FROM student WHERE id = ?", [id]);
  return rows[0];
};

export async function findStudentQuery(id, firstName, lastName) {
  const [rows] = await pool.query(
    `SELECT * FROM student
     WHERE id = ? OR firstName = ? OR lastName = ?`,
    [id || '', firstName || '', lastName || '']
  );
  return rows;
}

export async function createStudentByIdQuery(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) {
  const [result] = await pool.query(`
    INSERT INTO student (id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [id, firstName, lastName, email, password, enrollmentDate, dateOfBirth]);
  return getStudentByIdQuery(id);
};

export async function updateStudentEmailByIdQuery(id, email) {
  const [result] = await pool.query(`
    UPDATE student 
    SET email = ? 
    WHERE id = ?`,
      [email, id]
  );
  return result;
}

export async function deleteStudentByIdQuery(id) {
  const [result] = await pool.query(`
    DELETE 
    FROM student 
    WHERE id = ?`,
     [id]);
  return result;
}

export async function deleteAllStudentsQuery() {
  const [result] = await pool.query("DELETE FROM student");
  return result;
}

