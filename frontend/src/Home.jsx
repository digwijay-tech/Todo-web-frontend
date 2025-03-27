import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState({
    task: "",
    completed: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/task");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleOnchange = (event) => {
    setNewTask({
      ...newTask,
      task: event.target.value,
    });
  };

  const handleAddTask = async (event) => {
    event.preventDefault();

    console.log(newTask);

    if (newTask.task.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:8080/api/task", {
          task: newTask.task,
          completed: false,
        });
        console.log(response.data);
        setNewTask({ task: "", completed: false });
        setData([...data, response.data]);
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-100">
      <div className="bg-white  p-5 rounded-md shadow-md  min-h-96">
        <h1 className="py-3 text-blue-500 font-medium ">My Tasks</h1>
        <h2 className="font-semibold pb-3 text-xl ">TO-DO APP</h2>
        <div className="flex items-center justify-between pe-5 mb-4">
          <input
            className=" shadow-lg border h-10 p-2 w-max  rounded "
            type="text"
            name="task"
            placeholder="Enter Your task..."
            value={newTask.task}
            onChange={handleOnchange}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask(e)}
          />
          <button className=" rounded bg-blue-400 p-2 shadow-lg cursor-pointer text-blue-50 font-medium hover:bg-blue-500 " onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <div className="bg-white  rounded-md h-96 ">
          <h3 className=" font-medium mb-2">Tasks You Have</h3>

          <ul className=" overflow-y-auto h-80 ">
            {data.map((items, i) => (
              <li
                key={i}
                className={` rounded flex space-x-2 justify-between items-center p-3 mb-2 border  `}
              >
                <span className="uppercase font-medium   ">{items.task}</span>
                <div>
                  <button className=" text-red-500  ms-2 font-medium cursor-pointer">
                    Delete
                  </button>
                  <button
                    className={` text-green-400  ms-2 font-medium  cursor-pointer`}
                  >Completed</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
