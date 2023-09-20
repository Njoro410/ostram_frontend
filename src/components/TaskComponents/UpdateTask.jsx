import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  FormGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import RHFSelect from "../RHFSelect";
import DateSelector from "../DateSelector";
import { useGetAllStaffQuery } from "../../services/authorization/authorizationSlices";
import {
  useGetTodoPriorityQuery,
  useGetTodoStatusQuery,
} from "../../services/todo/todoSlice";
import RHFAutoComplete from "../RHFAutoComplete";

const UpdateTask = ({ owner, isAdmin }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: users, isFetching } = useGetAllStaffQuery();
  const { data: priority } = useGetTodoPriorityQuery();
  const { data: status } = useGetTodoStatusQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  if (owner) {
    return (
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          component="form"
          // onSubmit={handleSubmit(onSubmitHandler)}
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          {isAdmin ? (
            <Box
              gridColumn={isAdmin ? "span 6" : "span 0"}
              borderRadius="0.55rem"
              gridRow="span 1"
              sx={{ mt: 3.2 }}
            >
              <RHFAutoComplete
                options={users?.results || []}
                control={control}
                name="assigned_to"
                placeholder="Assigned To"
                isFetch={isFetching}
                multiple={true}
              />
            </Box>
          ) : null}
          <Box
            gridColumn={isAdmin ? "span 6" : "span 12"}
            borderRadius="0.55rem"
            gridRow="span 1"
            sx={{ mt: 1, ml: 1.5 }}
          >
            <DateSelector name="due_date" label="Due Date" control={control} />
            <RHFSelect
              name="status"
              control={control}
              errors={errors?.status}
              data={status?.results}
              label="Task Status"
              mt={1}
              disabled={true}
            />

            <RHFSelect
              name="priority"
              control={control}
              errors={errors?.priority}
              data={priority?.results}
              label="Task Priority"
              mt={1}
            />

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
        </Box>
      </DialogContent>
    );
  }
  return (
    <DialogContent>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        component="form"
        // onSubmit={handleSubmit(onSubmitHandler)}
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
          mt={5}
        >
          <RHFSelect
            name="status"
            control={control}
            errors={errors?.status}
            data={status?.results}
            label="Task Status"
          />
        </Box>
      </Box>
    </DialogContent>
  );
};

export default UpdateTask;
