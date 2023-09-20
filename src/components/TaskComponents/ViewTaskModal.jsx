import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { GlassDialog } from "../GlassDialog";
import formatDate from "../../utils/formatDate";

import useUser from "../../hooks/useUser";
import UpdateTask from "./UpdateTask";
import TaskFacts from "./TaskFacts";

const ViewTaskModal = ({ open, onClose, todo }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const today = new Date();
  const formattedCreatedDate = formatDate(todo.created_on);

  const { user, isLoading, isSuccess, isError, error } = useUser();
  const [updateView, setUpdateView] = useState(false);

  const handleViewChange = () => {
    setUpdateView(!updateView);
  };

  // const onSubmitHandler = async (data, e, theme) => {
  //   e.preventDefault();
  //   try {
  //     notifications.show({
  //       id: "load-data",
  //       loading: true,
  //       title: "Loading...",
  //       message: "Please wait as the request is being processed",
  //       autoClose: true,
  //       withCloseButton: true,
  //       styles: () => ({
  //         root: {
  //           backgroundColor: "whitesmoke",
  //           borderColor: "white",
  //           "&::before": { backgroundColor: "white" },
  //         },
  //         title: {
  //           color: "black",
  //           fontWeight: "bolder",
  //           fontSize: "0.95rem",
  //         },
  //         description: {
  //           color: "black",
  //           fontWeight: "normal",
  //           fontSize: "0.8rem",
  //         },
  //         closeButton: {
  //           color: "black",
  //           "&:hover": { backgroundColor: "gray" },
  //         },
  //       }),
  //     });

  //     const response = await addTodo(data).unwrap();

  //     notifications.update({
  //       id: "load-data",
  //       color: "green",
  //       title: "Success",
  //       message: response.message,
  //       autoClose: 5000,
  //       icon: (
  //         <CheckCircleIcon
  //           sx={{ backgroundSize: "1rem", backgroundColor: "#02d054" }}
  //         />
  //       ),
  //       styles: () => ({
  //         root: {
  //           backgroundColor: "#02d054",
  //           borderColor: "white",
  //           "&::before": { backgroundColor: "white" },
  //         },
  //         title: {
  //           color: "white",
  //           fontWeight: "bolder",
  //           fontSize: "0.95rem",
  //         },
  //         description: {
  //           color: "white",
  //           fontWeight: "bolder",
  //           fontSize: "0.8rem",
  //         },
  //         closeButton: {
  //           color: "white",
  //           "&:hover": { backgroundColor: "gray" },
  //         },
  //       }),
  //     });

  //     reset();
  //   } catch (err) {
  //     // console.log(err);
  //     notifications.update({
  //       id: "load-data",
  //       color: "red",
  //       title: "Error",
  //       message: err.data.message,
  //       autoClose: 5000,
  //       icon: <CancelIcon sx={{ backgroundSize: "1rem" }} />,
  //       styles: () => ({
  //         root: {
  //           backgroundColor: "#f94c18",
  //           borderColor: "white",
  //           "&::before": { backgroundColor: "white" },
  //         },
  //         title: {
  //           color: "white",
  //           fontWeight: "bolder",
  //           fontSize: "0.95rem",
  //         },
  //         description: {
  //           color: "white",
  //           fontWeight: "bolder",
  //           fontSize: "0.8rem",
  //         },
  //         closeButton: {
  //           color: "white",
  //           "&:hover": { backgroundColor: "gray" },
  //         },
  //       }),
  //     });
  //   }
  // };

  return (
    <GlassDialog
      key={todo.id}
      open={open}
      onClose={onClose}
      // maxWidth={updateView ? "xl" : "lg"}
      maxWidth="lg"
      fullWidth={true}
    >
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gap="10px"
        margin={1}
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          // gridColumn={updateView ? "span 6" : "span 8"}
          gridRow="span 2"
          // backgroundColor={theme.palette.background.alt}
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
              {todo.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.8rem", color: "text.secondary" }}
            >
              {todo.creator}
            </Typography>
          </DialogTitle>
          <Divider textAlign="right">
            <Typography
              sx={{
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: theme.palette.secondary[200],
              }}
              color="text.secondary"
            >
              {formattedCreatedDate === formatDate(today)
                ? "Today"
                : formattedCreatedDate ===
                  formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000))
                ? "Tomorrow"
                : formattedCreatedDate ===
                  formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000))
                ? "Yesterday"
                : formattedCreatedDate}
            </Typography>
          </Divider>
          <DialogContent>{todo.description}</DialogContent>
        </Box>

        <Box
          // gridColumn={updateView ? "span 6" : "span 4"}
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          {todo.creator_email === user?.results.email && updateView ? (
            <UpdateTask owner={true} isAdmin={user?.results.is_admin} />
          ) : todo.creator_email !== user?.results.email && updateView ? (
            <UpdateTask owner={false} isAdmin={user?.results.is_admin} />
          ) : (
            <TaskFacts todo={todo} />
          )}

          <DialogActions sx={{ mx: 2 }}>
            {updateView ? (
              <Button
                onClick={handleViewChange}
                variant="contained"
                color="error"
                sx={{
                  p: 2,
                  backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    color: "black",
                  }}
                >
                  Back
                </Typography>
              </Button>
            ) : null}

            <Button
              onClick={handleViewChange}
              type="button"
              fullWidth
              variant="contained"
              sx={{
                p: 2,
                backgroundColor: theme.palette.secondary[500],
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary[100],
                },
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                Update
              </Typography>
            </Button>
            {todo.creator_email === user?.results.email ||
            user?.results.is_admin ? (
              <Button
                onClick={onClose}
                variant="contained"
                color="error"
                sx={{
                  p: 2,
                  // backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#ff0000",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    color: "white",
                  }}
                >
                  Delete
                </Typography>
              </Button>
            ) : null}
          </DialogActions>
        </Box>
      </Box>

      <DialogActions></DialogActions>
    </GlassDialog>
  );
};

export default ViewTaskModal;
