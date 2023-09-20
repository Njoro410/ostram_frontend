import React from "react";
import FlexBetween from "../../../components/FlexBetween";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const SchedulerComponent = () => {
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const myEventsList = [
    {
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2023, 9, 5),
      end: new Date(2023, 9, 1),
    },
    {
      title: "Long Event",
      start: new Date(2023, 9, 7),
      end: new Date(2023, 9, 10),
    },
]
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SCHEDULER"
          subtitle="Change some fields and alter other settings"
        />
      </FlexBetween>

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
};

export default SchedulerComponent;
