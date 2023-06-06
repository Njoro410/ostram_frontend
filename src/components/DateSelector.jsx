import { Box, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Controller } from "react-hook-form";

const DateSelector = ({name,control, errors, label}) => {
  function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        defaultValue="" // add a default empty value for uncontrolled state
        render={({ field, fieldState }) => (
          <FormControl
            variant="outlined"
            fullWidth
            required
            error={!!fieldState.error || !!errors?.application_date}
            sx={{
              mt: 2.2,
            }}
          >
            <DatePicker
              openTo="day"
              views={["year", "month", "day"]}
              value={field.value ? field.value : ""} // set value based on whether field has a value
              onChange={(date) => {
                field.onChange(formatDateToYYYYMMDD(date));
              }}
              // inputFormat="DD/MM/yyyy"
              label={label}
              localeText={{ toolbarTitle: "Application Date" }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState?.error?.message,
                },
                toolbar: {
                  toolbarPlaceholder: "__",
                  toolbarFormat: "MMM Do YYYY",
                  hidden: false,
                },
              }}
            />
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
