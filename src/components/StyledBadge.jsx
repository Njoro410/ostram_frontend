import { Badge, styled } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme, todo }) => ({
    "& .MuiBadge-badge": {
      backgroundColor:
        todo.priority_name == "High"
          ? "#ff2200"
          : todo.priority_name == "Medium"
          ? "#e1ff00"
          : todo.priority_name == "Low"
          ? "#2eb700"
          : null,
      color:
        todo.priority_name == "High"
          ? "#ff2200"
          : todo.priority_name == "Medium"
          ? "#e1ff00"
          : todo.priority_name == "Low"
          ? "#2eb700"
          : null,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));