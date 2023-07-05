import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import AllTodo from "./AllTodo";
import AddTodo from "./AddTodo";
import MyTodo from "./MyTodo";
import OverdueTodo from "./OverdueTodo";
import CustomTabs from "../../../components/CustomTabs";

const TodoApp = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeTodoTab, setActiveTodoTab] = useState(0);

  const handleTodoTabChange = (event, newValue) => {
    setActiveTodoTab(newValue);
  };

  const todoTabs = [
    {
      label: "Public Todos",
    },
    {
      label: "Add Todo",
    },
    {
      label: "My Todos",
    },
    {
      label: "Overdue Todos",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="TODOS APP"
          subtitle="Create todos to always be on track"
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          height="15rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={todoTabs}
            value={activeTodoTab}
            onChange={handleTodoTabChange}
            orientation
          />
        </Box>
        <Box
          gridColumn="span 9"
          gridRow="span 3"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {activeTodoTab === 0 && <AllTodo />}
          {activeTodoTab === 1 && <AddTodo />}
          {activeTodoTab === 2 && <MyTodo />}
          {activeTodoTab === 3 && <OverdueTodo />}
        </Box>
      </Box>
    </Box>
  );
};

export default TodoApp;
