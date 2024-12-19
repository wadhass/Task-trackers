import  { useState } from "react";
const EditTask = ({ initialTask, onSave }) => {
  const [task, setTask] = useState(initialTask || "");

  const handleSave = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }
    onSave(task);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Edit your task"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditTask;

