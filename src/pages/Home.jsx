import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react"; 
import moment from "moment";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setShowBox(savedTasks.length === 0); 
  }, []);

  const handleAddTask = () => {
    if (!task.trim()) return;

    const taskWithDate = {
      text: task,
      date: moment().format("MMMM Do YYYY, h:mm a"),
    };

    const updatedTasks = [...tasks, taskWithDate];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
    setTask("");
    setShowBox(false); 
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
    setShowBox(updatedTasks.length === 0); 
  };

  const handleEditTask = (index) => {
    navigate(`/saveChange/${index}`, { state: { task: tasks[index], index } });
  };

  const renderTaskForm = () => (
    <div className="flex items-center w-full max-w-md space-x-2 mb-4">
      <input
        type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write a task"
        className="flex-1 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
      >
        + Add
      </button>
    </div>
  );

  const renderTasks = () => (
    <ul className="w-full max-w-md space-y-2">
      {tasks.map((task, index) => (
        <li key={index} className="flex flex-col justify-between items-start border rounded-md 
        px-4 py-2 bg-white shadow-sm">
          <div className="flex justify-between w-full items-center">
            <span className="text-gray-700">{task.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTask(index)}
                className="text-blue-600 hover:text-blue-700"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{task.date}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Tracker</h1>
      </header>

      {renderTaskForm()}

      {showBox && (
        <div className="mt-4">
          <Box size={40} className="text-gray-500 mx-auto" />
        </div>
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No tasks yet!</p>
      ) : (
        renderTasks()
      )}
    </div>
  );
};

export default Home;
