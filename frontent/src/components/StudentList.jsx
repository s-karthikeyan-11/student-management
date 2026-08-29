import { useEffect, useState } from "react";
import API from "../services/api";

function StudentList({ onEdit }) {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const fetchStudents = async () => {
        try {
            const response = await API.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
        window.addEventListener("studentUpdated", fetchStudents);

        return () => {
            window.removeEventListener("studentUpdated", fetchStudents);
        };
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`/students/${id}`);
            console.log(`Student with ID ${id} deleted successfully`);
            alert("Student deleted successfully");

            fetchStudents();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    const handleEdit = (student) => {
        onEdit(student);
        console.log("Editing student:", student);
    };


    const filteredStudents = students.filter((student) => {
        return (
            student.student_name.toLowerCase().includes(search.toLowerCase()) ||
            student.reg_no.toLowerCase().includes(search.toLowerCase()) ||
            student.email.toLowerCase().includes(search.toLowerCase()) ||
            student.address.toLowerCase().includes(search.toLowerCase())
        )
    });

    return (
        <div className="student-list">
            <h2>Student List</h2>

            <input
                className="search-input"
                type="text"
                placeholder="Search by name or register number or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Register Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student._id}>
                            <td>{student.student_name}</td>
                            <td>{student.reg_no}</td>
                            <td>{student.email}</td>
                            <td>{student.address}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(student)}>
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(student._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;