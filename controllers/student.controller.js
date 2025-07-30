import { getAllStudentsQuery, getStudentQuery, createStudentQuery, deleteStudentQuery, deleteAllStudentsQuery } from "../services/student.service.js";

// * Get All Students
export async function getAllStudents(req, res) {
  try {
    const students = await getAllStudentsQuery();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Get a Student
export async function getStudent(req, res) {
  const { id } = req.params;
  try {
    const student = await getStudentQuery(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: `Student with id ${id} not found`});
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Create A New Student
export async function createStudent(req, res) {
  try {
    const { id, firstName, lastName, email, password, enrollmentDate, dateOfBirth } = req.body;
    const student = await createStudentQuery(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// TODO Update a Student


// * Delete A Student
export async function deleteStudent(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteStudentQuery(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: `Student with id ${id} deleted successfully.` });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
}

// * Delete All Student
export async function deleteAllStudents(req, res, next) {
  try {
    const result = await deleteAllStudentsQuery();
    res.status(200).json({ success: true, message: `${result.affectedRows} students deleted successfully.` });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
}