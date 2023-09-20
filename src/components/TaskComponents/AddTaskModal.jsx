import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddTodoMutation,
  useGetTodoPriorityQuery,
  useGetTodoStatusQuery,
} from "../../services/todo/todoSlice";
import { useGetAllStaffQuery } from "../../services/authorization/authorizationSlices";
import { createTodoSchema } from "../../utils/validationSchema";
import RHFAutoComplete from "../RHFAutoComplete";
import DateSelector from "../DateSelector";
import { notifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RHFSelect from "../RHFSelect";
import { GlassDialog } from "../GlassDialog";


const AddTaskModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const { data: users, isFetching } = useGetAllStaffQuery();
  const { data: priority } = useGetTodoPriorityQuery();
  const { data: status } = useGetTodoStatusQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(createTodoSchema),
  });

  const onSubmitHandler = async (data, e, theme) => {
    e.preventDefault();
    try {
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Loading...",
        message: "Please wait as the request is being processed",
        autoClose: true,
        withCloseButton: true,
        styles: () => ({
          root: {
            backgroundColor: "whitesmoke",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "black",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "black",
            fontWeight: "normal",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "black",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });

      const response = await addTodo(data).unwrap();

      notifications.update({
        id: "load-data",
        color: "green",
        title: "Success",
        message: response.message,
        autoClose: 5000,
        icon: (
          <CheckCircleIcon
            sx={{ backgroundSize: "1rem", backgroundColor: "#02d054" }}
          />
        ),
        styles: () => ({
          root: {
            backgroundColor: "#02d054",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });

      reset();
    } catch (err) {
      // console.log(err);
      notifications.update({
        id: "load-data",
        color: "red",
        title: "Error",
        message: err.data.message,
        autoClose: 5000,
        icon: <CancelIcon sx={{ backgroundSize: "1rem" }} />,
        styles: () => ({
          root: {
            backgroundColor: "#f94c18",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
    }
  };

  return (
    <GlassDialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        Add Task
      </DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 12"
            borderRadius="0.55rem"
            gridRow="span 1"
            // sx={{ mt: 1.5 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              {...register("title")}
              error={!!errors?.title}
              helperText={errors.title?.message}
              // sx={{
              //   mt: 1,
              // }}
            />
          </Box>

          <Box
            gridColumn="span 8"
            borderRadius="0.55rem"
            gridRow="span 1"
            // sx={{ mt: 1.5 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              multiline
              minRows={5}
              maxRows={5}
              {...register("description")}
              error={!!errors?.description}
              helperText={errors.description?.message}
              sx={{
                mt: 1,
              }}
            />
          </Box>
          <Box
            gridColumn="span 4"
            borderRadius="0.55rem"
            gridRow="span 1"
            sx={{ mt: 1, ml: 1.5 }}
          >
            <RHFAutoComplete
              options={users?.results || []}
              control={control}
              name="assigned_to"
              placeholder="Assigned To"
              error={errors?.reports_to}
              helperText={errors.reports_to?.message}
              isFetch={isFetching}
              multiple={true}
            />
          </Box>

          <Box gridColumn="span 12" borderRadius="0.55rem" gridRow="span 1">
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
              <Box gridColumn="span 3" mt={1.2}>
                <FormGroup sx={{ display: "flex" }}>
                  <Controller
                    name="public"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            sx={{
                              "&.Mui-checked": {
                                color: theme.palette.secondary[500],
                              },
                            }}
                          />
                        }
                        label="Set Public"
                      />
                    )}
                  />
                </FormGroup>
              </Box>

              <Box gridColumn="span 3" mt={1.2}>
                <RHFSelect
                  name="status"
                  control={control}
                  errors={errors?.status}
                  data={status?.results}
                  label="Task Status"
                  mt={1}
                />
              </Box>

              <Box gridColumn="span 3" mt={1.2}>
                <RHFSelect
                  name="priority"
                  control={control}
                  errors={errors?.priority}
                  data={priority?.results}
                  label="Task Priority"
                  mt={1}
                />
              </Box>

              <Box gridColumn="span 3">
                <DateSelector
                  name="due_date"
                  label="Due Date"
                  control={control}
                  errors={errors?.application_date}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(onSubmitHandler)}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            my: 2,
            ml: 2,
            p: 2,
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            my: 2,
            mr: 2,
            p: 2,
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </GlassDialog>
  );
};

export default AddTaskModal;
