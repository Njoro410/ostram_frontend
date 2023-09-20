import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberRegisterSchema } from "../../utils/validationSchema";
import {
  useRegisterMemberMutation,
  useGetResidentialQuery,
  useUpdateMemberMutation,
} from "../../services/members/memberSlices";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useParams } from "react-router-dom";
import { removeDashesFromPhoneNumber } from "../../utils/formatFormInputs";
import RHFSelect from "../../components/RHFSelect";

const RegisterMember = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { memberNo } = useParams();

  const [memberRegister, { isLoading }] = useRegisterMemberMutation();
  const [memberUpdate] = useUpdateMemberMutation();
  const location = useLocation();
  const { member } = location.state || {};

  const {
    data: areas,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetResidentialQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(memberRegisterSchema),
    // prepopulate a select form,
    // defaultValues: member && memberNo ? member : {},
    defaultValues:
      member && memberNo
        ? {
            names: member.names,
            id_no: member.id_no,
            mbr_no: member.mbr_no,
            gender: member.gender,
            phone_no: removeDashesFromPhoneNumber(member.phone_no),
            residential: member.residential,
            next_of_kin: member.next_of_kin,
            phone_nos: removeDashesFromPhoneNumber(member.phone_nos),
            relationship: member.relationship,
          }
        : {},
  });
  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    console.log("form submitted");
    data.mbr_no = parseInt(data.mbr_no, 10); // Assuming base 10
    data.residential = parseInt(data.residential, 10); // Assuming base 10
    try {
      const memberData = await (member
        ? memberUpdate({
            memberNo,
            data,
          }).unwrap()
        : memberRegister(data).unwrap());
      toast.success(memberData.message, {
        duration: 8000,
        position: "top-right",
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#00ff1a",
          secondary: "#fff",
        },
        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      reset();
    } catch (err) {
      if (err.status === 400) {
        toast.error(err.data.errors.mbr_no, {
          duration: 8000,
          position: "top-right",
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#f70707",
            secondary: "#fff",
          },
          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      } else {
        toast.error("No server response", {
          duration: 8000,
          position: "top-right",
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#f70707",
            secondary: "#fff",
          },
          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
    }
  };
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title={member ? "MEMBER UPDATE" : "MEMBER REGISTRATION"}
        subtitle={
          member
            ? "Update member details"
            : "Register new members by filling their details"
        }
      />
      <Box
        mt="20px"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* This box will occupy the first half of the parent grid */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        >
          <Box>
            {/* This box will occupy the first half of the child grid */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
              {...register("names")}
              error={!!errors?.names}
              helperText={errors.names?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="id_no"
              label="ID Number"
              name="id_no"
              autoComplete="id_no"
              autoFocus
              {...register("id_no")}
              error={!!errors?.id_no}
              helperText={errors.id_no?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mbr_no"
              label="Member Number"
              name="mbr_no"
              autoComplete="mbr_no"
              autoFocus
              {...register("mbr_no")}
              error={errors.mbr_no ? true : false}
              helperText={errors.mbr_no?.message}
            />
          </Box>
          <Box>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.gender}
                  sx={{
                    mt: 2,
                  }}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select value={value} onChange={onChange} label="Gender">
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone_no"
              label="Phone Number"
              name="phone_no"
              autoComplete="phone_no"
              autoFocus
              {...register("phone_no")}
              error={errors.phone_no ? true : false}
              helperText={errors.phone_no?.message}
              sx={{
                mt: 2.5,
              }}
            />

            <Controller
              name="residential"
              control={control}
              defaultValue={member && memberNo ? member.residential : ""}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.residential}
                  sx={{
                    mt: 2,
                  }}
                >
                  <InputLabel>Residential Area</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Residential Area"
                  >
                    {areas?.results.map((area) => (
                      <MenuItem key={area.area_code} value={area.area_code}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.residential?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              disabled
              // {...register("email")}
              // error={errors.email ? true : false}
              // helperText={errors.email?.message}
              sx={{
                "& label": {
                  color: theme.palette.secondary[500],
                  "&.Mui-focused": {
                    color: theme.palette.secondary[500],
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[500],
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="krapin"
              label="KRA Pin"
              name="krapin"
              autoComplete="krapin"
              autoFocus
              disabled
              // {...register("kra_pin")}
              // error={errors.kra_pin ? true : false}
              // helperText={errors.kra_pin?.message}
              sx={{
                "& label": {
                  color: theme.palette.secondary[500],
                  "&.Mui-focused": {
                    color: theme.palette.secondary[500],
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[500],
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dob"
              label="D.O.B"
              name="dob"
              autoComplete="dob"
              autoFocus
              disabled
              sx={{
                "& label": {
                  color: theme.palette.secondary[500],
                  "&.Mui-focused": {
                    color: theme.palette.secondary[500],
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary[500],
                  },
                  "&:hover fieldset": {
                    borderColor: "green",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box
          backgroundColor={theme.palette.background.alt}
          gridColumn="span 4"
          gridRow="span 2"
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* This box will span 4 columns */}
          <TextField
            margin="normal"
            fullWidth
            id="next_of_kin"
            label="Next of Kin Name"
            name="next_of_kin"
            autoComplete="next_of_kin"
            autoFocus
            {...register("next_of_kin")}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone_nos"
            label="NoK Phone Number"
            name="phone_nos"
            autoComplete="phone_nos"
            autoFocus
            required
            {...register("phone_nos")}
            error={errors.phone_nos ? true : false}
            helperText={errors.phone_nos?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="relationship"
            label="NoK Relationship"
            name="relationship"
            autoComplete="relationship"
            autoFocus
            {...register("relationship")}
          />
        </Box>
        <Box gridColumn="span 8">
          {!isLoading ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 5,
                p: 1,
                backgroundColor: theme.palette.secondary[500],
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary[100],
                },
              }}
            >
              {member ? "Update" : "Submit"}
            </Button>
          ) : (
            <LoadingButton
              loading
              fullWidth
              variant="contained"
              sx={{ p: 1, mt: 5 }}
            >
              <span>{member ? "Update" : "Submit"}</span>
            </LoadingButton>
          )}
        </Box>
        <Box gridColumn="span 4">
          <Button
            type="reset"
            fullWidth
            variant="contained"
            disabled={!!member}
            sx={{
              mt: 5,
              p: 1,
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
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
};
export default RegisterMember;
