import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SaveChange = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [updatedTask, setUpdatedTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = savedTasks[parseInt(id, 10)]; 
    if (taskToEdit) {
      setUpdatedTask(taskToEdit.text); 
    }
  }, [id]);

  const handleSave = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (id !== undefined && savedTasks[parseInt(id, 10)]) {
    
      savedTasks[parseInt(id, 10)].text = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(savedTasks)); 
      navigate("/"); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
        placeholder="Update your task"
        className="w-96 max-w-md border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleSave}
        className="w-96 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
      >
        SaveChandes
      </button>
    </div>
  );
};

export default SaveChange;
