const Student = require("../models/Student");

// GET - Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database error"
        });
    }
};

// POST - Add student
const addStudent = async (req, res) => {
    try {
        const { student_name, reg_no, email, address } = req.body;

        if (!student_name || !reg_no || !email || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const student = await Student.create({
            student_name,
            reg_no,
            email,
            address
        });

        res.status(201).json({
            message: "Student added successfully",
            studentId: student._id
           
        });


    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Register number or email already exists"
            });
        }

        res.status(500).json({
            message: "Database error"
        });
    }
};

// PUT - Update student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_name, reg_no, email, address } = req.body;

        if (!student_name || !reg_no || !email || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const student = await Student.findByIdAndUpdate(
            id,
            {
                student_name,
                reg_no,
                email,
                address
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Register number or email already exists"
            });
        }

        res.status(500).json({
            message: "Database error"
        });
    }
};

// DELETE - Delete student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database error"
        });
    }
};

module.exports = {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
};