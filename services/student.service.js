import { pool } from "../config/database.connection.js";

export async function getAllStudents() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM student, course, attends
    ORDER BY lastName`);
  return rows;
};

export async function getStudentById(id) {
  const [rows] = await pool.query("SELECT * FROM student WHERE id = ?", [id]);
  return rows[0];
};

export async function findStudent(id, firstName, lastName) {
  const [rows] = await pool.query(
    `SELECT * FROM student
     WHERE id = ? OR firstName = ? OR lastName = ?`,
    [id || '', firstName || '', lastName || '']
  );
  return rows;
}

export async function createStudentById(id, firstName, lastName, email, hashedPassword, enrollmentDate, dateOfBirth) {
  const [result] = await pool.query(`
    INSERT INTO student (id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [id, firstName, lastName, email, hashedPassword, enrollmentDate, dateOfBirth]);
  return getStudentById(id);
};

export async function updateStudentEmailById(id, email) {
  const [result] = await pool.query(`
    UPDATE student 
    SET email = ? 
    WHERE id = ?`,
      [email, id]
  );
  return result;
}

export async function deleteStudentById(id) {
  const [result] = await pool.query(`
    DELETE 
    FROM student 
    WHERE id = ?`,
     [id]);
  return result;
}

export async function deleteAllStudents() {
  const [result] = await pool.query("DELETE FROM student");
  return result;
}

export async function getStudentsByCourse(courseID) {
  const [rows] = await pool.query(`
    SELECT 
       COUNT(a.id) AS totalStudents,
       GROUP_CONCAT(CONCAT(s.firstName, ' ', s.lastName) SEPARATOR ', ') AS studentNames
     FROM attends a JOIN student s 
          ON a.studentID = s.id
     WHERE a.courseID = ?`,
    [courseID]
  );
  return rows[0]; 
}

export async function getCourseById(id) {
  const [rows] = await pool.query("SELECT * FROM course WHERE id = ?", [id]);
  return rows[0];
}