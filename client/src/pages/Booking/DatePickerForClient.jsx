// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// function getDefaultValueFromDate(dateString) {
//   const [year, month, day] = dateString.split("/");
//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// }

// export default function Datepicker({
//   setSelectedDate,
//   handleSelectAppointmant,
//   selectedDate,
// }) {
//   console.log(selectedDate);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DatePicker"]}>
//         <StaticDatePicker
//           defaultValue={dayjs(getDefaultValueFromDate(selectedDate))}
//           onChange={(newValue) => {
//             const year = newValue.$y;
//             const month = newValue.$M + 1; // Adding 1 because months are 0-indexed
//             const day = newValue.$D;
//             setSelectedDate(`${year}/${month}/${day}`);
//             handleSelectAppointmant();
//           }}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

function getDefaultValueFromDate(dateString) {
  const [year, month, day] = dateString.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default function Datepicker({
  setSelectedDate,
  handleSelectAppointmant,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <StaticDatePicker
          onChange={(newValue) => {
            const year = newValue.$y;
            const month = newValue.$M + 1; // Adding 1 because months are 0-indexed
            const day = newValue.$D;
            setSelectedDate(`${year}/${month}/${day}`);
            handleSelectAppointmant();
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// function getDefaultValueFromDate(dateString) {
//   const [year, month, day] = dateString.split("/");
//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// }

// export default function Datepicker({
//   setSelectedDate,
//   handleSelectAppointmant,
//   selectedDate,
// }) {
//   console.log(selectedDate);
//   // Convert selected date to dayjs object
//   const selectedDay = dayjs(getDefaultValueFromDate(selectedDate));

//   // Calculate minDate as current day - 1
//   const minDate = dayjs().subtract(1, 'day');

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DatePicker"]}>
//         <StaticDatePicker
//           defaultValue={selectedDay}
//           minDate={minDate}
//           onChange={(newValue) => {
//             const year = newValue.$y;
//             const month = newValue.$M + 1; // Adding 1 because months are 0-indexed
//             const day = newValue.$D;
//             setSelectedDate(`${year}/${month}/${day}`);
//             handleSelectAppointmant();
//           }}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
