"use client";

import { Fragment, useEffect, useState } from "react";
import classes from "./Tasks.module.css";
import Card from "./ui/Card";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Tasks = (props) => {
  const [hiddenTasks, setHiddenTasks] = useState([]);

  const tasks = props.tasks;

  const router = useRouter()

  const deleteTask = async (id) => {
    try {
  
      const response = await fetch(`/api/tasks?_id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }
      
      // router.refresh()
      setHiddenTasks([...hiddenTasks, id]);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      {tasks.length === 0 ? (
        <p>No tasks Found</p>
      ) : (
        <Fragment>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task) => {
              return (
                <div key={task._id}>
                  {!hiddenTasks.includes(task._id) ? (
                    <Card className={classes.card}>
                      <li>{task.task}</li>
                      <div className={classes.icons}>
                        <Link href={`/edit-task/${task._id}`}>
                          <div>
                            <AiFillEdit />
                          </div>
                        </Link>
                        <BsTrash onClick={() => deleteTask(task._id)} />
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

export default Tasks;
