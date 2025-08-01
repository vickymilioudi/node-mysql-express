import bcrypt from 'bcrypt';
import { getAllStudents, getStudentById, 
         findStudent, createStudentById, 
         updateStudentEmailById, deleteStudentById, 
         deleteAllStudents, getStudentsByCourse, getCourseById} from "../services/student.service.js";

// * Get All Students
export async function getAllStudentsController(req, res) {
  try {
    const students = await getAllStudents();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Get a Student By Id
export async function getStudentByIdController(req, res) {
  const { id } = req.params.id;
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: `Student with id ${id} not found`});
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Get Students By Course
export async function getStudentsByCourseController(req, res) {
  try {
    const { courseID } = req.params;
    const result = await getStudentsByCourse(courseID);
    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Please provide courseID in the URL params."
      });
    }
    const exists = await getCourseById(courseID);
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: `Course with id ${courseID} does not exist.`
      });
    }
    if (result.totalStudents === 0) {
      return res.status(404).json({ success: false, message: `No students found for courseID ${courseID}.`});
    }
    res.status(200).json({ success: true, data: result});
  } catch (error) {
    console.error("Error fetching students by course:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later."});
  }
};

// * Find a Student by Id OR firstName OR lastName
export async function findStudentController(req, res) {
  try {
    const { id, firstName, lastName } = req.query;
    if (!id && !firstName && !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter: id, firstName or lastName."
      });
    }
    const students = await findStudent(id, firstName, lastName);
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
export async function createStudentByIdController(req, res) {
  const { id, firstName, lastName, email, password, enrollmentDate, dateOfBirth } = req.body;
  if (!id || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing or invalid required fields." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }
  if (enrollmentDate && isNaN(Date.parse(enrollmentDate))) {
    return res.status(400).json({ success: false, message: "Invalid enrollmentDate format." });
  }
  if (dateOfBirth && isNaN(Date.parse(dateOfBirth))) {
    return res.status(400).json({ success: false, message: "Invalid dateOfBirth format." });
  }
  try {
    const saltRounds = 13;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const student = await createStudentById(id, firstName, lastName, email, hashedPassword, enrollmentDate, dateOfBirth);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Update Student Email By Id
export async function updateStudentEmailByIdController(req, res) {
  const { id } = req.params;
  const { email } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid or missing student id." });
  }

  if (!email) {
      return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  try {
    const student = await getStudentById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: `Student with id ${id} not found.` });
    }
    if (student.email === email) {
      return res.status(400).json({ success: false, message: "New email is the same as the current email." });
    }
    
    const result = await updateStudentEmailById(id, email); 
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
export async function deleteStudentByIdController(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid or missing student id." });
  }

  try {
    const result = await deleteStudentById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: `Student with id ${id} deleted successfully.` });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// * Delete All Student
export async function deleteAllStudentsController(req, res, next) {
  try {
    const result = await deleteAllStudents();
    res.status(200).json({ success: true, message: `${result.affectedRows} students deleted successfully.` });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};