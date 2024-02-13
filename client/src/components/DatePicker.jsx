import React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as D } from "@mui/x-date-pickers/DatePicker";
// Define ProSpan component outside the functional component

const DatePicker = ({ date, setDate }) => {
  if (date !== "") {
    console.log(date);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "TimePicker",
          "DateTimePicker",
          "DateRangePicker",
        ]}
      >
        <DemoItem>
          <D
            onChange={(newValue) => {
              const year = newValue.$y;
              const month = newValue.$M + 1; // Adding 1 because months are 0-indexed
              const day = newValue.$D;

              setDate(`${year}/${month}/${day}`);
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
