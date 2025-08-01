---------- # SQL DATABASE ----------

DROP DATABASE IF EXISTS school;

---------- # CREATE DATABASE ----------
CREATE DATABASE school
	CHARSET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';

USE school;

---------- # CREATE TABLES ----------

---------- # 1 create students table [ENTITY] ----------
CREATE TABLE student (
    id VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
	password VARCHAR(500) NOT NULL,
    enrollmentDate DATE NOT NULL,
    dateOfBirth DATE NOT NULL,

    CONSTRAINT pk_student PRIMARY KEY(id)
);

---------- # 2 create teacher table [ENTITY] ----------
CREATE TABLE teacher (
    id VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
    hireDate DATE NOT NULL,

    CONSTRAINT pk_teacher PRIMARY KEY(id)
);

---------- # 3 create course table [ENTITY] ----------
CREATE TABLE course (
    id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    
    teacherID VARCHAR(50) NOT NULL,
    
    CONSTRAINT pk_course PRIMARY KEY(id),
    CONSTRAINT fk_course_teacher FOREIGN KEY(teacherID) REFERENCES teacher(id) ON DELETE CASCADE ON UPDATE CASCADE
);

---------- # 4 create attends table [RELATIONSHIP: student - course] ----------
CREATE TABLE attends (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    studentID VARCHAR(50) NOT NULL,
    courseID VARCHAR(50) NOT NULL,
    grade DECIMAL(4,2) DEFAULT NULL,

    CONSTRAINT pk_attends PRIMARY KEY(id),
    CONSTRAINT fk_attends_student FOREIGN KEY(studentID) REFERENCES student(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_attends_course FOREIGN KEY(courseID) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
);