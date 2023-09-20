import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const RHFSelect = ({ control, errors, data, name, label, mt }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <FormControl
          variant="outlined"
          fullWidth
          error={errors}
          sx={{
            mt: mt,
          }}
        >
          <InputLabel>{label}</InputLabel>
          <Select value={value} onChange={onChange} label={label}>
            {data?.map((item) => (
              <MenuItem key={item.id || item.area_code} value={item.id || item.area_code}>
                {item.status_name || item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RHFSelect;
