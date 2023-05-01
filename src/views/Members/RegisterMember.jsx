import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { KeyboardArrowDown } from "@mui/icons-material";

const RegisterMember = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [area, setArea] = useState("");
  const handleChange = (event) => {
    setArea(event.target.value);
  };
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="MEMBER REGISTRATION"
        subtitle="Register new members by filling their details"
      />

      <Box
        mt="20px"
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
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="fullname"
              autoFocus
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
              id="idnumber"
              label="ID Number"
              name="idnumber"
              autoComplete="idnumber"
              autoFocus
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
              id="membernumber"
              label="Member Number"
              name="membernumber"
              autoComplete="membernumber"
              autoFocus
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
            <FormControl
              fullWidth
              required
              autoFocus
              margin="normal"
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
              <InputLabel id="arealabel">Residential Area</InputLabel>
              <Select
                labelId="arealabel"
                id="residentialSelect"
                label="Residential Area"
                name="residentialSelect"
                value={area}
                onChange={handleChange}
              >
                <MenuItem value={1}>Kajiado</MenuItem>
                <MenuItem value={2}>Isinya</MenuItem>
                <MenuItem value={3}>Bissil</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              required
              autoFocus
              margin="normal"
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
                value={area}
                onChange={handleChange}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phonenumber"
              autoComplete="phoneNumber"
              autoFocus
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
              id="fullname"
              label="Email Address"
              name="fullname"
              autoComplete="fullname"
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
              id="phoneNumber"
              label="KRA Pin"
              name="phonenumber"
              autoComplete="phoneNumber"
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
              id="relationship"
              label="D.O.B"
              name="phonenumber"
              autoComplete="phoneNumber"
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
              id="relationship"
              label="Registration date"
              name="phonenumber"
              autoComplete="phoneNumber"
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
          gridRow="span 3"
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* This box will span 4 columns */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Next of Kin Name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
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
            id="phoneNumber"
            label="NoK Phone Number"
            name="phonenumber"
            autoComplete="phoneNumber"
            autoFocus
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
            id="relationship"
            label="NoK Relationship"
            name="phonenumber"
            autoComplete="phoneNumber"
            autoFocus
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
    </Box>
  );
};

export default RegisterMember;
