import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

// import {
//   AccessTimeIcon,
//   QueryBuilderIcon,
//   EngineeringIcon,
//   AssignmentTurnedInIcon,
//   AssignmentLateIcon,
//   PriorityHighIcon,
//   LowPriorityIcon,
//   DensityMediumIcon,
// } from "@mui/icons-material";

import formatDate from "../../utils/formatDate";

const TaskFacts = ({ todo }) => {
  const today = new Date();
  const formattedDueDate = formatDate(todo.due_date);

  return (
    <DialogContent>
      <Divider textAlign="left">
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          color="text.secondary"
        >
          Status
        </Typography>
      </Divider>
      <Chip
        sx={{
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          mt: 1,
          "& .MuiChip-label": {
            textTransform: "uppercase",
            fontWeight: "bold",
            // color:"white"
          },
        }}
        size="small"
        label={todo.status_name}
        color={
          todo.status_name.toUpperCase() === "TODO"
            ? "primary"
            : todo.status_name.toUpperCase() === "IN PROGRESS"
            ? "secondary"
            : todo.status_name.toUpperCase() === "COMPLETE"
            ? "success"
            : todo.status_name.toUpperCase() === "OVERDUE"
            ? "error"
            : null
        }
        icon={
          todo.status_name.toUpperCase() === "TODO" ? (
            <QueryBuilderIcon />
          ) : todo.status_name.toUpperCase() === "IN PROGRESS" ? (
            <EngineeringIcon />
          ) : todo.status_name.toUpperCase() === "COMPLETED" ? (
            <AssignmentTurnedInIcon />
          ) : todo.status_name.toUpperCase() === "OVERDUE" ? (
            <AssignmentLateIcon />
          ) : null
        }
      />

      <Divider textAlign="right" sx={{ mt: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          color="text.secondary"
        >
          Priority
        </Typography>
      </Divider>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mr={2.5}
      >
        <Typography></Typography>

        <Chip
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            mt: 1,
            "& .MuiChip-label": {
              textTransform: "uppercase",
              fontWeight: "bold",
              // color:"white"
            },
          }}
          size="small"
          label={todo.priority_name}
          color={
            todo.priority_name.toUpperCase() === "HIGH"
              ? "error"
              : todo.priority_name.toUpperCase() === "MEDIUM"
              ? "secondary"
              : todo.priority_name.toUpperCase() === "LOW"
              ? "primary"
              : null
          }
          icon={
            todo.priority_name.toUpperCase() === "HIGH" ? (
              <PriorityHighIcon />
            ) : todo.priority_name.toUpperCase() === "MEDIUM" ? (
              <DensityMediumIcon />
            ) : todo.priority_name.toUpperCase() === "LOW" ? (
              <LowPriorityIcon />
            ) : null
          }
        />
      </Box>

      <Divider textAlign="left" sx={{ mt: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          color="text.secondary"
        >
          Assignee(s)
        </Typography>
      </Divider>
      <Box display="flex" gap={0.5} mt={1}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </Box>
      <Divider textAlign="right">
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          color="text.secondary"
        >
          Due Date
        </Typography>
      </Divider>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: formattedDueDate < formatDate(today) ? "#eb861a" : "",
          }}
          color="text.secondary"
        >
          <AccessTimeIcon />

          {formattedDueDate === formatDate(today)
            ? "Today"
            : formattedDueDate ===
              formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000))
            ? "Tomorrow"
            : formattedDueDate ===
              formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000))
            ? "Yesterday"
            : formattedDueDate}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: formattedDueDate < formatDate(today) ? "#eb861a" : "",
          }}
          color="text.secondary"
        >
          {formattedDueDate < formatDate(today) ? "(Late)" : ""}
        </Typography>
      </Box>
    </DialogContent>
  );
};

export default TaskFacts;
