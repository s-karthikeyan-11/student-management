import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {

  const [editStudent, setEditStudent] = useState(null);

  // console.log(editStudent);

  const handleUpdate = () => {
    setEditStudent(null);
  }

  return (
    <div>

      <h1 className="root-h1">Student Management System</h1>

      <StudentForm editStudent={editStudent} onUpdated={handleUpdate} />
      <StudentList
        onEdit={setEditStudent}

      />

    </div>
  );
}

export default App;