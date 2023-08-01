import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

const ReportsFilter = () => {
  const [value, setValue] = useState([null, null]);
  console.log(value, "picked value");
  return (
    <DatePickerInput
      type="range"
      label="Filter transactions"
      placeholder="Select month or period"
      value={value}
      onChange={setValue}
      mx="auto"
      maw={400}
    />
  );
};

export default ReportsFilter;
