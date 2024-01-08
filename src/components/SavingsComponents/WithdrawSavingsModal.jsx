import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React from "react";
  import RHFAutoComplete from "../RHFAutoComplete";
  import DateSelector from "../DateSelector";
  import RHFSelect from "../RHFSelect";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useGetMembersQuery } from "../../services/members/memberSlices";
  import { WithdrawSavingsSchema } from "../../utils/validationSchema";
import { useGetSavingsAccountsQuery, useWithdrawMemberSavingsMutation } from "../../services/savings/savingsSlice";
  
  const WithdrawSavingsModal = ({ open, onClose }) => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { data: members, isFetching } = useGetSavingsAccountsQuery();
  
    console.log(members);
  
    const [withdrawMemberSavings, { isLoading }] = useWithdrawMemberSavingsMutation();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control,
    } = useForm({ 
      resolver: yupResolver(WithdrawSavingsSchema),
    });
  
    const onSubmitHandler = async (data, event) => {
      event.preventDefault();
      // console.log(data)
      try {
        const response = await withdrawMemberSavings({
          memberId: data.account,
          data: {
            account: data.account,
            withdrawn_amount: data.withdrawn_amount,
            withdrawn_date: data.withdrawn_date,
          },
        }).unwrap();
        // Handle the response
        console.log(response);
      } catch (err) {
        // Handle the error
        // console.log(err);
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle>Withdraw Savings</DialogTitle>
        <DialogContent>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="260px"
            borderRadius="0.55rem"
            component="form"
            //   onSubmit={handleSubmit(onSubmitHandler)}
            p="1rem"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <Box gridColumn="span 12" gridRow="span 1">
              <RHFAutoComplete
                options={members?.results || []}
                control={control}
                name="account"
                placeholder="Member Account"
                error={!!errors?.member}
                helperText={errors.member?.message}
                isFetch={isFetching}
                multiple={false}
              />
              <DateSelector
                name="withdrawn_date"
                label="Withdrawn Date"
                control={control}
                errors={errors?.received_date}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount Withdrawn"
                name="withdrawn_amount"
                autoComplete="amount"
                autoFocus
                {...register("withdrawn_amount")}
                error={!!errors?.withdrawn_amount}
                helperText={errors.withdrawn_amount?.message}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary.light}
              gutterBottom
              variant="button"
              display="block"
            >
              Cancel
            </Typography>
          </Button>
          <Button onClick={handleSubmit(onSubmitHandler)}>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary.light}
              gutterBottom
              variant="button"
              display="block"
            >
              Submit
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default WithdrawSavingsModal;
  