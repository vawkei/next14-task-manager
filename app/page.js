"use client";

import EditTask from "@/components/EditTask";
import Form from "@/components/Form";
import Tasks from "@/components/Tasks";
import { Fragment, useEffect, useState } from "react";

const HomePage = () => {
  console.log("Shows up in the terminal: This is a server component");

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showEditTask,setEditTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      const data = await response.json();
      console.log(data.tasks);

      const arrayedData = data.tasks;
      const loadedTask = [];


      for (const taskData of arrayedData) {
        loadedTask.push({ _id: taskData._id, task: taskData.task });
      }

      setTasks(loadedTask);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return ( 
    <div>
        <h1>HomePage</h1>
        <Form onFetch={fetchTasks} />
        <Tasks tasks={tasks} />
        {showEditTask && <EditTask onFetch={fetchTasks} />}
    </div>
   );
}
 
export default HomePage;
