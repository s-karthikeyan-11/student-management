import { useEffect, useState } from 'react';
import API from '../services/api';



function StudentForm({ editStudent, onUpdated }) {
  const [student, setStudent] = useState({
    student_name: "",
    reg_no: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.student_name ||
      !student.reg_no ||
      !student.email ||
      !student.address
    ) 
    
    {
      alert("Please fill in all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(student.email)) {
      alert("Please enter a valid email address");
      return;
    }

      try {
        const response = editStudent
          ? await API.put(`/students/${editStudent._id}`, student)
          : await API.post('/students', student);
          console.log("student added/updated:", response.data.message);
        alert(response.data.message);
        if (onUpdated) {
          onUpdated();
        }

        setStudent({
          student_name: "",
          reg_no: "",
          email: "",
          address: "",
        });
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      }
    };
    const handleConsole=async()=>{
      try {
        const response = await API.get('/students');
        console.log("Fetched students:", response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    return (

      <div className="student-form">
        <h2>Add Student</h2>
        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={student.student_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reg_no"
          placeholder="Registration Number"
          value={student.reg_no}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
        />
        <button className="add-btn" type="button"
        onClick={handleSubmit}>
          {editStudent ? "Update Student" : "Add Student"}
        </button>
        <button className="console-btn" type="button" onClick={handleConsole}>
          Console Log Students
        </button>
      </div>

    );
  }

  export default StudentForm;
