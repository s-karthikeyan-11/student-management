import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {

  const [editStudent, setEditStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleUpdate = () => {
    setRefresh(!refresh);
    setEditStudent(null);
  }

  return (
    <div>
      <StudentForm editStudent={editStudent} onUpdated={handleUpdate} />
      <StudentList
       onEdit={setEditStudent}
        refresh={refresh}
       
       />
    </div>
  );
}

export default App;