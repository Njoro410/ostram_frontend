import React, { useEffect, useState } from "react";
import { useLazyGetPublicTodosQuery } from "../../../services/todo/todoSlice";
import TaskList from "./TaskList";

const AllTodo = () => {
  const [todos, setTodos] = useState(null);
  const [getPublicTodos] = useLazyGetPublicTodosQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPublicTodos().then((response) => {
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
