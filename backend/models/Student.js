const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        student_name: {
            type: String,
            required: true
        },
        reg_no: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);