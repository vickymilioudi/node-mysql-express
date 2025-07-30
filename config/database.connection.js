import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,  
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

export async function getAllStudents() {
  const [rows] = await pool.query("SELECT * FROM student");
  return rows 
};

export async function getStudent(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM student
  WHERE id = ?
  `, [id])
  return rows[0]
};

export async function createStudent(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth) {
  const [result] = await pool.query(`
  INSERT INTO student (id, firstName, lastName, email, password, enrollmentDate, dateOfBirth)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, firstName, lastName, email, password, enrollmentDate, dateOfBirth])
  return getStudent(id)
}

const students = await getAllStudents();
const student = await getStudent("S001");

/*
const result = await createStudent(
    'S006',
    'Giannis',
    'Nikolaou',
    'giannis.n@example.com',
    'giannisStrong456',
    '2024-09-01',
    '2001-12-05'
);

console.log(result)*/

