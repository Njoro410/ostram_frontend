import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import RHFAutoComplete from "../../components/RHFAutoComplete";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { useForm } from "react-hook-form";
import DateSelector from "../../components/DateSelector";
import RHFSelect from "../../components/RHFSelect";

const Contributions = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const { data: members, isFetching } = useGetMembersQuery({ skip: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({});
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="RECORD DAILY MEMBER CONTRIBUTIONS"
        subtitle="Record daily member contributions"
      />
      <Box
        mt="20px"
        component="form"
        // onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        display="grid"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        gridAutoRows="160px"
        gap="20px"
        // height="100vh"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="grid"
          gap="10px"
        >
          <RHFAutoComplete
            options={members?.results || []}
            control={control}
            name="applicant"
            placeholder="Member's Name"
            error={!!errors?.applicant}
            helperText={errors.applicant?.message}
            isFetch={isFetching}
            multiple={false}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="inherit"
            gap="1.5rem"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Amount Received"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <DateSelector
              name="daily_collection_date"
              label="Daily Collection Date"
              control={control}
              errors={errors?.application_date}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Received by"
              name="names"
              autoComplete="names"
              autoFocus
            />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            gridAutoRows="160px"
            // backgroundColor='red'
            gap="20px"
            // height="100vh"
            pb="10rem"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 3",
              },
            }}
          >
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Savings"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Deposits"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Interest"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Repayment"
                name="names"
                autoComplete="names"
                autoFocus
              />
            </Box>
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Maintenance Fee"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Late Charges"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Registration Fee"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Processing Fee"
                name="names"
                autoComplete="names"
                autoFocus
              />
            </Box>

            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Insurance Fee"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Affidavit Fee"
                name="names"
                autoComplete="names"
                autoFocus
              />

              <Button
                type="reset"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  p: 1.8,
                  backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                <span>Reset</span>
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  p: 1.8,
                  backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                <span>Submit</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contributions;
