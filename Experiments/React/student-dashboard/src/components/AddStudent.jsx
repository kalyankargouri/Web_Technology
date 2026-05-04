import { useState } from "react";

function AddStudent({ students, setStudents }) {

  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name === "") {
      alert("Enter name!");
      return;
    }

    setStudents([...students, name]);
    setName("");
    alert("Student Added!");
  };

  return (
    <div>
      <h2>Add Student</h2>

      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter name"
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddStudent;