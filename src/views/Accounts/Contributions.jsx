import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Autocomplete,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import RHFAutoComplete from "../../components/RHFAutoComplete";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { useForm } from "react-hook-form";
import DateSelector from "../../components/DateSelector";
import RHFSelect from "../../components/RHFSelect";
import { useMakeContributionsMutation } from "../../services/contributions/contributionSlices";
import { contributionsSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAllStaffQuery } from "../../services/authorization/authorizationSlices";
import RHFCheckbox from "../../components/RHFCheckbox";

const Contributions = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const { data: members, isFetching } = useGetMembersQuery({ skip: true });
  const { data: staff } = useGetAllStaffQuery({ skip: true });

  const [makeContributions, { isLoading }] = useMakeContributionsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(contributionsSchema),
  });

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();
    try {
      const response = await makeContributions(data).unwrap();
      // Handle the response
    } catch (err) {
      // Handle the error
      // console.log(err);
    }
  };

  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="RECORD DAILY MEMBER CONTRIBUTIONS"
        subtitle="Record daily member contributions"
      />
      <Box
        mt="20px"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
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
          height={550}
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="grid"
          gap="10px"
        >
          <RHFAutoComplete
            options={members?.results || []}
            control={control}
            name="member"
            placeholder="Member's Name"
            error={!!errors?.member}
            helperText={errors.member?.message}
            isFetch={isFetching}
            multiple={false}
          />

          <Box
            gap="1.5rem"
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            // gridAutoRows="160px"
            // backgroundColor='red'
            // height="100vh"
            // pb="10rem"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 3",
              },
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Amount Received"
              {...register("total_amount")}
              error={!!errors?.total_amount}
              helperText={errors.total_amount?.message}
            />

            <DateSelector
              name="collection_date"
              label="Daily Collection Date"
              control={control}
              errors={errors?.collection_date}
            />

            <Box mt={2}>
              <RHFAutoComplete
                options={staff?.results || []}
                control={control}
                name="received_by"
                placeholder="Received by"
                error={!!errors?.received_by}
                helperText={errors.received_by?.message}
                isFetch={isFetching}
                multiple={false}
              />
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
                {...register("savings")}
                error={!!errors?.savings}
                helperText={errors.savings?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Deposits"
                {...register("deposits")}
                error={!!errors?.deposits}
                helperText={errors.deposits?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Repayment"
                {...register("loan_repayment")}
                error={!!errors?.loan_repayment}
                helperText={errors.loan_repayment?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Interest"
                {...register("loan_interest")}
                error={!!errors?.loan_interest}
                helperText={errors.loan_interest?.message}
              />
            </Box>
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Maintenance Fee"
                {...register("maintenance_fee")}
                error={!!errors?.maintenance_fee}
                helperText={errors.maintenance_fee?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Late Charges"
                {...register("late_charges")}
                error={!!errors?.late_charges}
                helperText={errors.late_charges?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Form"
                {...register("loan_form")}
                error={!!errors?.loan_form}
                helperText={errors.loan_form?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Processing Fee"
                {...register("loan_processing_fee")}
                error={!!errors?.loan_processing_fee}
                helperText={errors.loan_processing_fee?.message}
              />
            </Box>

            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Loan Insurance Fee"
                {...register("loan_insurance_fee")}
                error={!!errors?.loan_insurance_fee}
                helperText={errors.loan_insurance_fee?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Registration Fee"
                {...register("registration_fee")}
                error={!!errors?.registration_fee}
                helperText={errors.registration_fee?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="General Charges"
                {...register("general_charges")}
                error={!!errors?.general_charges}
                helperText={errors.general_charges?.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Pass Book"
                {...register("passbook")}
                error={!!errors?.passbook}
                helperText={errors.passbook?.message}
              />
            </Box>
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="names"
                label="Affidavit Fee"
                {...register("affidavit_fee")}
                error={!!errors?.affidavit_fee}
                helperText={errors.affidavit_fee?.message}
              />

              <RHFCheckbox
                label="Sent via paybill?"
                control={control}
                name="paybill"
                padding={2.7}
                defaultValue={false}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3.5,
                  p: 2.5,
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

              <Button
                type="reset"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  p: 1.8,
                  backgroundColor: theme.palette.secondary[700],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                <span>Reset</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contributions;
