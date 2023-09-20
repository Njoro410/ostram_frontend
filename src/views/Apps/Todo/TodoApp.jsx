import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import AllTodo from "./AllTodo";
import MyTodo from "./MyTodo";
import CustomTabs from "../../../components/CustomTabs";
import MyAssignedTodo from "./MyAssignedTodo";


const TodoApp = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeTodoTab, setActiveTodoTab] = useState(0);

  const handleTodoTabChange = (event, newValue) => {
    setActiveTodoTab(newValue);
  };

  const todoTabs = [
    {
      label: "My Tasks",
    },
    {
      label: "Assigned Tasks",
    },
    {
      label: "General Tasks",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="TASK MATE"
          subtitle="Create tasks to always be on track"
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 2"
          gridRow="span 2"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          height="fit-content"
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
          gridColumn="span 10"
          height="fit-content"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {activeTodoTab === 0 && <MyTodo />}
          {activeTodoTab === 1 && <MyAssignedTodo />}
          {activeTodoTab === 2 && <AllTodo />}


        </Box>
      </Box>
    </Box>
  );
};

export default TodoApp;
