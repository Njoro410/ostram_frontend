import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLazyGetUserTodoQuery } from "../../../services/todo/todoSlice";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/auth/authSlice";

const AllTodo = () => {
  const [todos, setTodos] = useState(null);
  const userId = useSelector(selectUserId);
  const [getUserTodo] = useLazyGetUserTodoQuery();

  useEffect(() => {
    getUserTodo(userId).then((response) => {
      setTodos(response.data);
    });
  }, []);


  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          m: 3,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
        variant="h4"
        gutterBottom
      >
        Public Todos
      </Typography>
      <Divider variant="middle" />
      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {todos?.results.map((todo) => (
          <Box key={todo.id}>
            <Box m={2}>
              <Box>
                <Typography
                  sx={{ fontWeight: "bolder" }}
                  variant="h6"
                  gutterBottom
                >
                  {todo.title}
                </Typography>
                <Typography sx={{ mb: 1 }} variant="body1" gutterBottom>
                  {todo.description}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography
                  sx={{ display: "flex" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  <CalendarMonthOutlinedIcon />
                  {bull}
                  {todo.due_date}
                </Typography>
                {bull}
                <Typography
                  sx={{ display: "flex" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  <Person2OutlinedIcon />
                  {bull}
                  {todo.creator}
                </Typography>
                {bull}
                <Typography
                  sx={{ display: "flex" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  <PersonAddAltOutlinedIcon />
                  {bull}
                  {todo.assignee}
                </Typography>
              </Box>
            </Box>
            <Divider variant="middle" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllTodo;
