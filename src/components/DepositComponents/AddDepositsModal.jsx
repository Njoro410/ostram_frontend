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
import { AddSavingsSchema } from "../../utils/validationSchema";
import {
  useAddMemberDepositsMutation,
  useGetDepositsAccountsQuery,
} from "../../services/deposits/depositSlice";

const AddDepositsModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: members, isFetching } = useGetDepositsAccountsQuery();

  console.log(members);

  const [addMemberSavings, { isLoading }] = useAddMemberDepositsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(AddSavingsSchema),
  });

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();
    // console.log(data)
    try {
      const response = await addMemberSavings({
        memberId: data.account,
        data: {
          account: data.account,
          received_amount: data.received_amount,
          received_date: data.received_date,
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
      <DialogTitle>Add Deposits</DialogTitle>
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
              name="received_date"
              label="Received Date"
              control={control}
              errors={errors?.received_date}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount Received"
              name="amount_recieved"
              autoComplete="amount"
              autoFocus
              {...register("received_amount")}
              error={!!errors?.received_amount}
              helperText={errors.received_amount?.message}
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

export default AddDepositsModal;
