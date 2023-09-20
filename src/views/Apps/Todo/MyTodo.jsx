import React, { useEffect, useState } from "react";
import { useLazyGetUserTodoQuery } from "../../../services/todo/todoSlice";
import TaskList from "./TaskList";

const AllTodo = () => {
  const [todos, setTodos] = useState(null);
  const [getUserTodo] = useLazyGetUserTodoQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserTodo().then((response) => {
      setTodos(response.data);
      setIsLoading(false);
    });
  }, []);

  const categorizedTasks = {
    todo: todos?.results.filter((task) => task.status === 3),
    inprogress: todos?.results.filter((task) => task.status === 2),
    completed: todos?.results.filter((task) => task.status === 1),
    overdue: todos?.results.filter((task) => task.status === 4),
  };

  return (
    <TaskList
      todo={categorizedTasks.todo}
      inprogress={categorizedTasks.inprogress}
      completed={categorizedTasks.completed}
      overdue={categorizedTasks.overdue}
      isLoading={isLoading}
    />
  );
};

export default AllTodo;
