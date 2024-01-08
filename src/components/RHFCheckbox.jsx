import { Checkbox, FormControlLabel, useTheme } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const RHFCheckbox = ({ control, label, name, disabled, padding, defaultValue }) => {
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={disabled}
              
              sx={{
                "&.Mui-checked": {
                  color: theme.palette.secondary[500],
                },
                "&.Mui-disabled": {
                  color: theme.palette.background.alt,
                },
                py:padding
                
              }}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default RHFCheckbox;
