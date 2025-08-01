import { pool } from "../config/database.connection.js";

export async function getAllStudents() {
  const [rows] = await pool.query(`
    SELECT 
      s.id AS studentID,
      s.firstName,
      s.lastName,
      s.email,
      s.enrollmentDate,
      s.dateOfBirth,
      GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS courses,
      GROUP_CONCAT(DISTINCT a.grade ORDER BY c.name SEPARATOR ', ') AS grades
    FROM student s
    LEFT JOIN attends a ON s.id = a.studentID
    LEFT JOIN course c ON a.courseID = c.id
    GROUP BY s.id, s.firstName, s.lastName, s.email, s.enrollmentDate, s.dateOfBirth
    ORDER BY s.lastName;
  `);
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
};

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
};

export async function deleteStudentById(id) {
  const [result] = await pool.query(`
    DELETE 
    FROM student 
    WHERE id = ?`,
     [id]);
  return result;
};

export async function deleteAllStudents() {
  const [result] = await pool.query("DELETE FROM student");
  return result;
};

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
};

export async function getCourseById(id) {
  const [rows] = await pool.query("SELECT * FROM course WHERE id = ?", [id]);
  return rows[0];
};