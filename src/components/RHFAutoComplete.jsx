import * as React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, CircularProgress, Typography } from "@mui/material";

const RHFAutoComplete = ({
  control,
  options,
  name,
  placeholder,
  error,
  helperText,
  isFetch,
  multiple,
}) => {
  if (multiple) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, value, ref } = field;

          const selectedOptions = options.filter((option) =>
            value?.includes(option.mbr_no || option.id)
          );

          return (
            <Autocomplete
              multiple
              value={selectedOptions}
              getOptionLabel={(option) => option.names || option.name}
              filterSelectedOptions
              renderOption={(props, option) => (
                <Typography {...props} key={option.mbr_no || option.id}>
                  {option.names || option.name}
                </Typography>
              )}
              onChange={(e, newValue) => {
                onChange(newValue.map((option) => option.mbr_no || option.id));
              }}
              id="controllable-states"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={placeholder}
                  inputRef={ref}
                  error={error}
                  helperText={helperText}
                  // sx={{ mt: 1 }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isFetch ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          );
        }}
      />
    );
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value, ref } = field;
        return (
          <Autocomplete
            value={
              value
                ? options.find((option) => {
                    return value === option.mbr_no || value === option.id;
                  }) ?? null
                : null
            }
            getOptionLabel={(option) => {
              return option.names || option.lendee || option.full_name;
            }}
            renderOption={(props, option) => {
              let display = option.names || option.lendee || option.full_name;
              if (display === option.full_name) {
                display = option.full_name;
              } else {
                display = `${option.names || option.lendee} (${
                  option.mbr_no || option.member
                })`;
              }
              return (
                <Box key={option.mbr_no || option.id}>
                  <p {...props}>{display}</p>
                </Box>
              );
            }}
            onChange={(e, newValue) => {
              onChange(newValue ? newValue.mbr_no || newValue.id : null);
            }}
            id="controllable-states"
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label={placeholder}
                inputRef={ref}
                error={error}
                helperText={helperText}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isFetch ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default RHFAutoComplete;
