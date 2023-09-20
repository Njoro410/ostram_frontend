import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import { useGetMembersQuery } from "../../../services/members/memberSlices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendSMSSchema } from "../../../utils/validationSchema";
import { useSendSingleSmsMutation } from "../../../services/sms/smsSlice";
import { notifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const SingleSMS = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 500px)");
  const { data: members, isFetching } = useGetMembersQuery();
  const [sendSingleSms, { isLoading }] = useSendSingleSmsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(sendSMSSchema),
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {

      notifications.show({
        id: "load-data",
        loading: true,
        title: "Loading...",
        message: "Please wait as the request is being processed",
        autoClose: false,
        withCloseButton: true,
        styles: () => ({
          root: {
            backgroundColor: "whitesmoke",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "black",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "black",
            fontWeight: "normal",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "black",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });


      const response = await sendSingleSms(data).unwrap();
      
      notifications.update({
        id: "load-data",
        color: "green",
        title: "Success",
        message: response.message,
        autoClose: 5000,
        icon: (
          <CheckCircleIcon
            sx={{ backgroundSize: "1rem", backgroundColor: "#02d054" }}
          />
        ),
        styles: () => ({
          root: {
            backgroundColor: "#02d054",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
    } catch (err) {
 
      notifications.update({
        id: "load-data",
        color: "red",
        title: "Error",
        message: err.data.message,
        autoClose: 5000,
        icon: <CancelIcon sx={{ backgroundSize: "1rem" }} />,
        styles: () => ({
          root: {
            backgroundColor: "#f94c18",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
    }
  };

  return (
    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap="10px"
      margin={2}
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          variant="overline"
          display="block"
          sx={{ textAlign: "right", fontSize: "0.85rem", fontWeight: "bolder" }}
        >
          send a message to a single member
        </Typography>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
      >
        <RHFAutoComplete
          options={members?.results || []}
          control={control}
          name="member"
          placeholder="Select a member to send SMS to"
          error={!!errors?.member}
          helperText={errors.member?.message}
          isFetch={isFetching}
          multiple={false}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Type your message"
          name="message"
          autoFocus
          multiline
          maxRows={errors?.message ? 10 : 10}
          minRows={errors?.message ? 10 : 10}
          error={errors?.message}
          helperText={errors.message?.message}
          {...register("message")}
          sx={{
            mt: 1.2,
            "& .MuiFormHelperText-root": {
              fontSize: "0.855rem",
              fontWeight: "light",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{mt:"-11.2rem"}}>
                Dear member,
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        gridColumn="span 10"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
      >
        {" "}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            p: 2,
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          send
        </Button>
      </Box>
      <Box
        gridColumn="span 2"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
      >
        <Button
          type="reset"
          fullWidth
          variant="contained"
          sx={{
            p: 2,
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SingleSMS;
