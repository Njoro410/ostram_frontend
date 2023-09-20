import React from "react";
import { Box, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import format from "date-fns/format"; // Import date-fns format function

const DateSelector = ({ name, control, errors, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
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
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                const formattedDate = date ? format(date, "yyyy-MM-dd") : ""; // Format the date
                field.onChange(formattedDate); // Set the formatted date in the field
              }}
              label={label}
              localeText={{ toolbarTitle: "Application Date" }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState?.error?.message,
                },
                toolbar: {
                  toolbarPlaceholder: "__",
                  toolbarFormat: "do MMMM yyyy",
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



