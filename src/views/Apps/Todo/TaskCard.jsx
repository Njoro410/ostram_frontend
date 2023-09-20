import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import formatDate from "../../../utils/formatDate";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import ViewTaskModal from "../../../components/TaskComponents/ViewTaskModal";
import { StyledBadge } from "../../../components/StyledBadge";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
`;

const TaskCard = ({ todo }) => {
  const today = new Date();
  const formattedDueDate = formatDate(todo.due_date);
  const formattedCreatedDate = formatDate(todo.created_on);

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const ellipsis = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  };

  return (
    <GlassCard
      key={todo.id}
      sx={{
        borderRadius: "0.5rem",
        mb: 1,
      }}
      variant="outlined"
    >
      <ViewTaskModal open={openModal} onClose={handleModalClose} todo={todo} />
      <CardActionArea onClick={handleModalOpen}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              variant="dot"
              todo={todo}
              sx={{ pr: 5 }}
            />
          }
          title={todo.creator}
          subheader={
            formattedCreatedDate === formatDate(today)
              ? "Today"
              : formattedCreatedDate ===
                formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000))
              ? "Tomorrow"
              : formattedCreatedDate ===
                formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000))
              ? "Yesterday"
              : formattedCreatedDate
          }
        />

        <CardContent>
          <Typography sx={{ ...ellipsis }} variant="h5" component="div">
            {todo.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {todo.priority_name}
          </Typography>
          <Typography sx={{ ...ellipsis }} variant="body2">
            {todo.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
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

          <AvatarGroup max={4}>
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Remy Sharp"
              src="https://xsgames.co/randomusers/avatar.php?g=male"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Travis Howard"
              src="https://xsgames.co/randomusers/avatar.php?g=female"
            />
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Cindy Baker"
              src="https://xsgames.co/randomusers/avatar.php?g=female"
            />
          </AvatarGroup>
        </CardActions>
      </CardActionArea>
    </GlassCard>
  );
};

export default TaskCard;
