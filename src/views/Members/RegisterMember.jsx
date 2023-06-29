import React, { useEffect } from "react";
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
  Typography,
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

const RegisterMember = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [memberRegister, { isLoading }] = useRegisterMemberMutation();
  const [memberUpdate] = useUpdateMemberMutation();
  let { state } = useLocation();
  console.log(state, "state");
  const member = state?.member;
  console.log(member, "member");
  const { memberNo } = useParams();

  const {
    data: areas,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetResidentialQuery({ skip: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(memberRegisterSchema),
    // prefills form but error if there's no member. solve that
    // prepopulate a select form,
    defaultValues: member ? member : "",
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const memberData = await memberRegister(data).unwrap();
      // console.log(memberData);
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
      // console.log(err);
      // console.log(err.data.errors.mbr_no);
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
            {/* </Box> */}
            {/* This box will occupy the second half of the parent grid */}
            {/* <Box gridColumn="2 / span 1"> */}
            {/* This box will occupy the second half of the child grid */}

            <Controller
              name="residential"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.residential}
                  sx={{
                    mt: 2,
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
            required
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
              Submit
            </Button>
          ) : (
            <LoadingButton
              loading
              fullWidth
              variant="contained"
              sx={{ p: 1, mt: 5 }}
            >
              <span>Submit</span>
            </LoadingButton>
          )}
        </Box>

        <Box gridColumn="span 4">
          <Button
            type="reset"
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
            <span>Reset</span>
          </Button>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
};

export default RegisterMember;
