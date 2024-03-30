"use client";

// import { useParams,useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import classes from "./EditTask.module.css";
import Card from "./ui/Card";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditTask = (props) => {
  const { id } = useParams();

  const [enteredTask, setEnteredTask] = useState("");

  const enteredTaskChangeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

    const router = useRouter();

  //use useEffect to get the entered name from the GET request:
  useEffect(() => {
    getInputData();
  }, [id]);


//=========================GET FUNCTION  
  const getInputData = async () => {
    try {
      const response = await fetch(`/api/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch task data');
      }
      
      const tasks = await response.json();
      const task = tasks.tasks.find(i => i._id === id);
      console.log(task);
  
      
      setEnteredTask(task.task);
  
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };
  
//=========================EDIT FUNCTION
    const editFunc = async () => {

      try{
        const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        body: JSON.stringify({_id:id,task:enteredTask}),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      router.push("/")
      props.onFetch()
      }catch(error){
        console.log(error)
      }

    };

  return (
    <Card className={classes.card}>
      <h2>Edit Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
           editFunc(id)
        }}>
        <div className={classes.control}>
          <label htmlFor="">TaskID</label>
          <input
            value={id}
            style={{ border: "none", outline: "none" }}
            disabled
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="">Task</label>
          <input
            id="task"
            type="text"
            value={enteredTask}
            onChange={enteredTaskChangeHandler}
          />
        </div>

        <div className={classes.action}>
          <button>Edit</button>
        </div>
      </form>
    </Card>
  );
};

export default EditTask;
