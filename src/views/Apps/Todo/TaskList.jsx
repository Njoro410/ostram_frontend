import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskCard from "./TaskCard";
import AddTaskModal from "../../../components/TaskComponents/AddTaskModal";
import CustomLinearProgress from "../../../components/CustomLinearProgress";

const TaskList = ({ todo, inprogress, completed, overdue, isLoading }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 500px)");

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap="10px"
      margin={1}
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      <AddTaskModal open={openModal} onClose={handleModalClose} />

      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
      >
        {isLoading ? <CustomLinearProgress /> : null}
        <Button
          onClick={handleModalOpen}
          sx={{
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            py: 2,
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
          variant="contained"
          endIcon={<AddTaskIcon />}
        >
          Add Task
        </Button>
      </Box>

      <Box gridColumn="span 12" gridRow="span 2">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="10px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="1rem 1rem"
            backgroundColor={theme.palette.background.default}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            {" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
              variant="overline"
            >
              Todo
            </Typography>
          </Box>

          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="1rem 1rem"
            backgroundColor={theme.palette.background.default}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
              variant="overline"
            >
              In Progress
            </Typography>
          </Box>

          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="1rem 1rem"
            backgroundColor={theme.palette.background.default}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
              variant="overline"
            >
              Completed
            </Typography>
          </Box>

          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="1rem 1rem"
            backgroundColor={theme.palette.background.default}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
              variant="overline"
            >
              Overdue
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box gridColumn="span 12" gridRow="span 2">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="10px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          {/* todo */}
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
          >
            {todo?.map((todo) => (
              <TaskCard todo={todo} />
            ))}
          </Box>

          {/* in progress */}
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
          >
            {inprogress?.map((todo) => (
              <TaskCard todo={todo} />
            ))}
          </Box>

          {/* completed */}
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
          >
            {completed?.map((todo) => (
              <TaskCard todo={todo} />
            ))}
          </Box>

          {/* overdue */}
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
          >
            {overdue?.map((todo) => (
              <TaskCard todo={todo} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskList;
