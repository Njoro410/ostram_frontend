import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProfileBox from "../../../components/ProfileBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkStaffDetailsSchema } from "../../../utils/validationSchema";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import { useLazyGetStaffQuery } from "../../../services/authorization/authorizationSlices";
import formatDate from "../../../utils/formatDate";
import FlexBetween from "../../../components/FlexBetween";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Groups2Icon from "@mui/icons-material/Groups2";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Scrollbars } from "react-custom-scrollbars-2";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ViewStaff = ({ users, isFetch }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [getStaff, { isFetching }] = useLazyGetStaffQuery();
  const [staffId, setStaffId] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [user, setUser] = useState([]);
  const [groupsOpen, setGroupsOpen] = useState({});
  const [staffPermissionsOpen, setStaffPermissionsOpen] = useState(false);

  const handleListClick = (group) => {
    setGroupsOpen((prevState) => ({
      ...prevState,
      [group.name]: !prevState[group.name],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(checkStaffDetailsSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setStaffId(data.staff);
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      getStaff(staffId).then((response) => { 
        setUser(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      gap="10px"
      sx={{
        "& > div": {
          gridColumn: isNonMediumScreens ? undefined : "span 12",
        },
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Box
        gridColumn="span 11"
        height="fit-content"
        borderRadius="0.55rem"
        marginX={2}
        marginY={0.8}
      >
        <RHFAutoComplete
          options={users || []}
          control={control}
          name="staff"
          placeholder="Choose a staff to see their details"
          error={!!errors?.staff}
          helperText={errors.staff?.message}
          isFetch={isFetch}
          multiple={false}
        />
      </Box>
      <Box
        gridColumn="span 1"
        borderRadius="0.55rem"
        height="fit-content"
        marginX={2}
        marginTop={0.8}
      >
        <Button
          type="submit"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "13px 20px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#3c52b2",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      {user.length != 0 ? (
        <Box gridColumn="span 12" gridRow="span 12">
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap="10px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <Box
              gridColumn="span 12"
              marginX={2}
              backgroundColor={theme.palette.background.alt}
            >
              <ProfileBox user={user} theme={theme} />
            </Box>
            <Box
              gridColumn="span 12"
              p="1.25rem 1rem"
              marginX={2}
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <FlexBetween sx={{ paddingX: 5 }}>
                <Tooltip
                  title="Designates whether staff is an administrator"
                  arrow
                  placement="top"
                  sx={{
                    "&.MuiTooltip-tooltip": {
                      color: "red",
                      fontSize: "20px",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      display="flex"
                      gap={1}
                    >
                      Admin
                      <InfoOutlinedIcon />
                    </Typography>
                    {user?.results?.is_admin ? (
                      <CheckCircleIcon sx={{ color: "#66ff00" }} />
                    ) : (
                      <CancelIcon sx={{ color: "red" }} />
                    )}
                  </Box>
                </Tooltip>

                <Tooltip
                  title="Designates whether this staff should be treated as active.Equivalent to deleted staff"
                  arrow
                  placement="top"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      display="flex"
                      gap={1}
                    >
                      Active
                      <InfoOutlinedIcon />
                    </Typography>
                    {user?.results?.is_active ? (
                      <CheckCircleIcon sx={{ color: "#66ff00" }} />
                    ) : (
                      <CancelIcon sx={{ color: "red" }} />
                    )}
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Designates whether the user can log into server admin site."
                  arrow
                  placement="top"
                  sx={{ typography: "h4" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      display="flex"
                      gap={1}
                    >
                      Staff
                      <InfoOutlinedIcon />
                    </Typography>
                    {user?.results?.is_staff ? (
                      <CheckCircleIcon sx={{ color: "#66ff00" }} />
                    ) : (
                      <CancelIcon sx={{ color: "red" }} />
                    )}
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Designates that this staff has all permissions without explicitly assigning them.."
                  arrow
                  placement="top"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      display="flex"
                      gap={1}
                    >
                      Superuser
                      <InfoOutlinedIcon />
                    </Typography>
                    {user?.results?.is_superuser ? (
                      <CheckCircleIcon sx={{ color: "#66ff00" }} />
                    ) : (
                      <CancelIcon sx={{ color: "red" }} />
                    )}
                  </Box>
                </Tooltip>
              </FlexBetween>
            </Box>
            <Box
              gridColumn="span 12"
              p="1.25rem 1rem"
              marginX={2}
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <FlexBetween>
                <Typography variant="h6" gutterBottom>
                  Date Joined: <br />
                  {formatDate(user?.results?.date_joined)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Last Login: <br />
                  {formatDate(user?.results?.last_login)}
                </Typography>
              </FlexBetween>
            </Box>
            <Box
              gridColumn="span 12"
              p="1.25rem 1rem"
              marginX={2}
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.secondary[400],
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                Contact Info
              </Typography>
              <FlexBetween>
                <Typography variant="h6" gutterBottom>
                  Phone no: {user?.results?.phone_number}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email Address: {user?.results?.email}
                </Typography>
              </FlexBetween>
            </Box>
            <Box
              gridColumn="span 12"
              p="1.25rem 1rem"
              marginX={2}
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.secondary[400],
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                Personal Info
              </Typography>
              <FlexBetween>
                <Typography variant="h6" gutterBottom>
                  Gender: {user?.results?.gender}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Date Of Birth: {formatDate(user?.results?.dob)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Current Salary: {user?.results?.current_salary}
                </Typography>
              </FlexBetween>
            </Box>

            <Box
              gridColumn="span 12"
              p="1.25rem 1rem"
              marginX={2}
              marginBottom={2}
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <FlexBetween>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.secondary[400],
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Staff Permissions and Groups
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.secondary[400],
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Reports To: {user?.results?.reports_to?.name}
                </Typography>
              </FlexBetween>
              <Box display="flex" gap={2} flexWrap="wrap">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: theme.palette.background.default,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Permission Groups
                    </ListSubheader>
                  }
                >
                  {user?.results?.groups.map((group) => (
                    <>
                      <ListItemButton
                        key={group.id}
                        onClick={() => handleListClick(group)}
                      >
                        <ListItemIcon>
                          <Groups2Icon />
                        </ListItemIcon>
                        <ListItemText primary={group.name} />
                        {groupsOpen[group.name] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={groupsOpen[group.name]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {group.permissions.map((permission) => (
                            <ListItemButton key={permission.id} sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <KeyIcon />
                              </ListItemIcon>
                              <ListItemText primary={permission.name} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ))}
                </List>

                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: theme.palette.background.default,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Staff Specific Permissions
                    </ListSubheader>
                  }
                >
                  <>
                    <ListItemButton
                      onClick={() =>
                        setStaffPermissionsOpen(!staffPermissionsOpen)
                      }
                    >
                      <ListItemIcon>
                        <LockOpenIcon />
                      </ListItemIcon>
                      <ListItemText primary="Granted Permissions" />
                      {staffPermissionsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={staffPermissionsOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {user?.results?.user_permissions.map((permission) => (
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <KeyIcon />
                            </ListItemIcon>
                            <ListItemText primary={permission.name} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ViewStaff;
