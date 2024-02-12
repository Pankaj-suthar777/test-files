import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as D } from "@mui/x-date-pickers/DatePicker";
// Define ProSpan component outside the functional component
const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

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
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
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
