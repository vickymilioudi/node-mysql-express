import { getAllStudentsQuery, getStudentByIdQuery, findStudentQuery, createStudentByIdQuery, updateStudentEmailByIdQuery, deleteStudentByIdQuery, deleteAllStudentsQuery } from "../services/student.service.js";

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


// * Get a Student By Id
export async function getStudentById(req, res) {
  const { id } = req.params;
  try {
    const student = await getStudentByIdQuery(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: `Student with id ${id} not found`});
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Find a Student by Id OR firstName OR lastName
export async function findStudent(req, res) {
  try {
    const { id, firstName, lastName } = req.body;
    const students = await findStudentQuery(id, firstName, lastName);
    if (students.length === 0) {
      return res.status(404).json({ success: false, message: "No matching students found." });
    }
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error finding students:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Create A New Student By Id
export async function createStudentById(req, res) {
  try {
    const { id, firstName, lastName, email, password, enrollmentDate, dateOfBirth } = req.body;
    const student = await createStudentByIdQuery(id, firstName, lastName, email, password, enrollmentDate, dateOfBirth);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Update Student Email By Id
export async function updateStudentEmailById(req, res) {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const result = await updateStudentEmailByIdQuery(id, email);

    if (!email) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: `Student with id ${id} not found.` });
    }

    res.status(200).json({ success: true, message: `Email updated successfully for student ${id}.` });
  } catch (error) {
    console.error("Error updating email:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


// * Delete A Student By Id
export async function deleteStudentById(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteStudentByIdQuery(id);
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