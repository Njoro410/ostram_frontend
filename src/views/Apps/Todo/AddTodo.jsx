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
import { Toaster, toast } from "react-hot-toast";
import DateSelector from "../../../components/DateSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTodoSchema } from "../../../utils/validationSchema";

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

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const response = await addTodo(data).unwrap();
      toast.success(response.message, {
        duration: 5000,
        position: "top-right",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#00ff1a",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <Toaster />
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
