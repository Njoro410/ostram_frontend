import React from "react";
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
import { useRegisterMemberMutation } from "../../features/members/memberSlices";
import toast, { Toaster } from "react-hot-toast";

const RegisterMember = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [memberRegister, {isLoading}] = useRegisterMemberMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(memberRegisterSchema),
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
          console.log(data);
      const memberData = await memberRegister(data).unwrap()
      console.log(memberData.message)
      reset();
    } catch (err) {
      console.log(err)
    }

  };
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="MEMBER REGISTRATION"
        subtitle="Register new members by filling their details"
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
          display="grid"
          gap="10px"
          backgroundColor={theme.palette.background.alt}
          gridRow="span 3"
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            gridColumn: "span 8",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          <Box gridColumn="1 / span 1">
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
              error={errors.names ? true : false}
              helperText={errors.names?.message}
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
              id="id_no"
              label="ID Number"
              name="id_no"
              autoComplete="id_no"
              autoFocus
              {...register("id_no")}
              error={!!errors?.id_no}
              helperText={errors.id_no?.message}
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
              type="number"
              fullWidth
              id="mbr_no"
              label="Member Number"
              name="mbr_no"
              autoComplete="mbr_no"
              autoFocus
              {...register("mbr_no")}
              error={errors.mbr_no ? true : false}
              helperText={errors.mbr_no?.message}
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

            <Controller
              name="residential"
              control={control}
              defaultValue={1}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.residential}
                  sx={{
                    mt: 1,
                  }}
                >
                  <InputLabel>Residential Area</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Residential Area"
                  >
                    <MenuItem value={1}>Kajiado</MenuItem>
                    <MenuItem value={2}>Isinya</MenuItem>
                    <MenuItem value={3}>M46</MenuItem>
                  </Select>
                  <FormHelperText>{errors.residential?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* <FormControl
              fullWidth
              // required
              autoFocus
              margin="normal"
              // {...register("gender")}
              // error={errors.gender ? true : false}
              // helpertext={errors.gender?.message}
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
            >
              <InputLabel id="genderlabel">Gender</InputLabel>
              <Select
                labelId="genderlabel"
                id="genderSelect"
                label="Gender"
                name="genderSelect"
                value={gender}
                onChange={genderChange}

              >
                <MenuItem value={'MALE'}>Male</MenuItem>
                <MenuItem value={'FEMALE'}>Female</MenuItem>
              </Select>
            </FormControl> */}

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
          {/* This box will occupy the second half of the parent grid */}
          <Box gridColumn="2 / span 1">
            {/* This box will occupy the second half of the child grid */}

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

            <TextField
              margin="normal"
              required
              fullWidth
              id="dor"
              label="Registration date"
              name="dor"
              autoComplete="dor"
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
            fullWidth
            id="phone_nos"
            label="NoK Phone Number"
            name="phone_nos"
            autoComplete="phone_nos"
            autoFocus
            {...register("phone_nos")}
            error={errors.phone_nos ? true : false}
            helperText={errors.phone_nos?.message}
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
            fullWidth
            id="relationship"
            label="NoK Relationship"
            name="relationship"
            autoComplete="relationship"
            autoFocus
            {...register("relationship")}
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

          {/* <TextField
            margin="normal"
            
            fullWidth
            id="nokemail"
            label="NoK Email"
            name="nokemail"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
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

 */}
        </Box>

        <Box gridColumn="span 4">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 9,
              p: 4,
              backgroundColor: theme.palette.secondary[500],
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterMember;
