import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAddTodoMutation } from "../../../services/todo/todoSlice";
import DateSelector from "../../../components/DateSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTodoSchema } from "../../../utils/validationSchema";
import { notifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const AddTodo = () => {
  const theme = useTheme();
  const [addTodo, { isLoading }] = useAddTodoMutation();

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
        autoClose: false,
        withCloseButton: false,
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
      console.log(err);
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
        Add Todo
      </Typography>
      <Divider variant="middle" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ m: 4 }}
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
          sx={{
            mt: 1,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
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
                      />
                    }
                    label="Set Public"
                  />
                )}
              />
            </FormGroup>
          </Box>
          <Box>
            <DateSelector
              name="due_date"
              label="Due Date"
              control={control}
              errors={errors?.application_date}
            />
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
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
      </Box>
    </Box>
  );
};

export default AddTodo;
