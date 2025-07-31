-- ---------- INSERT STUDENTS ----------
INSERT INTO student (id, firstName, lastName, email, password, enrollmentDate, dateOfBirth)
VALUES
('S001', 'Alice', 'Johnson', 'alice.johnson@example.com', 'passAlice123', '2022-09-01', '2004-05-15'),
('S002', 'Bob', 'Smith', 'bob.smith@example.com', 'bobSecure99', '2023-01-15', '2003-11-22'),
('S003', 'Clara', 'Nguyen', 'clara.nguyen@example.com', 'claraPass456', '2021-10-10', '2002-02-28'),
('S004', 'Leo', 'Turner', 'leo.turner@example.com', 'leoSafe007', '2023-02-28', '2004-01-09'),
('S005', 'Maya', 'Zhou', 'maya.zhou@example.com', 'mayaPass001', '2021-09-15', '2003-05-04'),
('S006', 'Frank', 'Wright', 'frank.wright@example.com', 'frankPass333', '2021-11-05', '2002-12-19'),
('S007', 'Grace', 'Kim', 'grace.kim@example.com', 'graceStrong88', '2023-01-10', '2004-09-03'),
('S008', 'Kira', 'Singh', 'kira.singh@example.com', 'kiraPass808', '2022-05-17', '2003-08-21'),
('S009', 'David', 'Lee', 'david.lee@example.com', 'davidPass789', '2023-09-01', '2004-07-12'),
('S010', 'Eva', 'Martinez', 'eva.martinez@example.com', 'evaSecure12', '2022-03-20', '2003-03-08'),
('S011', 'Isla', 'Peterson', 'isla.peterson@example.com', 'islaPass555', '2023-06-14', '2004-02-17'),
('S012', 'Jack', 'Brown', 'jack.brown@example.com', 'jackSecure42', '2021-12-01', '2002-06-27'),
('S013', 'Henry', 'Adams', 'henry.adams@example.com', 'henry123secure', '2022-07-25', '2003-10-30'),
('S015', 'Maria', 'Papadopoulou', 'maria.papa@example.com', 'mariaSecure15', '2023-09-10', '2004-06-21'),
('S016', 'Maria', 'Kostaki', 'maria.kostaki@example.com', 'mariaStrong16', '2024-01-12', '2003-12-03');

-- ---------- INSERT TEACHERS ----------
INSERT INTO teacher (id, firstName, lastName, email, password, hireDate)
VALUES
('T001', 'John', 'Anderson', 'john.anderson@school.edu', 'teachJohn!', '2020-08-20'),
('T002', 'Emily', 'Brown', 'emily.brown@school.edu', 'emilyTeach99', '2021-01-10');

-- ---------- INSERT COURSES ----------
INSERT INTO course (id, name, description, teacherID)
VALUES
('C101', 'Mathematics I', 'Introduction to algebra and calculus.', 'T001'),
('C102', 'Physics I', 'Fundamentals of mechanics and thermodynamics.', 'T002'),
('C103', 'Computer Science Basics', 'Introduction to programming and algorithms.', 'T001');

-- ---------- INSERT ATTENDS ----------
INSERT INTO attends (id, studentID, courseID, grade)
VALUES
('A001', 'S001', 'C101', 8.50),
('A002', 'S001', 'C102', 9.00),
('A003', 'S002', 'C101', 7.00),
('A004', 'S002', 'C103', 6.50),
('A005', 'S003', 'C103', 9.50);

COMMIT;