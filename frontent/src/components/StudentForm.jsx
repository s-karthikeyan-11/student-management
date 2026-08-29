import { useEffect, useState } from 'react';
import API from '../services/api';

function StudentForm({ editStudent, onUpdated }) {

  const [student, setStudent] = useState({
    student_name: "",
    reg_no: "",
    email: "",
    address: "",
  });

  const [showForm, setShowForm] = useState(false);
  // console.log("showForm state:", showForm);

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
      setShowForm(true);
      console.log("Editing student:", editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);

    const { name, value } = e.target;
      // console.log("Updating student state:", name, value);
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.student_name ||
      !student.reg_no ||
      !student.email ||
      !student.address
    ) {
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

      console.log("Student added/updated:", response.data.message);

      alert(response.data.message);

      if (onUpdated) {
        onUpdated();
      }
      window.dispatchEvent(new Event("studentUpdated"));

      setStudent({
        student_name: "",
        reg_no: "",
        email: "",
        address: "",
      });

      setShowForm(false);

    } catch (error) {
      console.error("Add/Update error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  return (
    <>
  

      <button
        className="new-btn"
        type="button"
        onClick={() => setShowForm(true)}
      >
        +Add New Student
      </button>

      
      

      {showForm && (
        <div className="modal-overlay">
          <div className="student-form">

          <h2>
            {editStudent ? "Update Student" : "Add Student"}
          </h2>

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

          <button
            className="add-btn"
            type="button"
            onClick={handleSubmit}
          >
            {editStudent ? "Update Student" : "Submit"}
          </button>
          <button
          type="button"
          onClick={()=>setShowForm(false)}
          >
            Cancel
          </button>
          </div>

        </div>
      )}
    </>
  );
}

export default StudentForm;