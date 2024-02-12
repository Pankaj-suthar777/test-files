import { Button } from "@mui/material";
import { useState } from "react";

function TimePicker({ time, setTime, setConfirm }) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [amPm, setAmPm] = useState("AM"); // Default AM

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setHour(newHour);
    updateTime(newHour, minute, amPm);
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    setMinute(newMinute);
    updateTime(hour, newMinute, amPm);
  };

  const handleAmPmChange = (e) => {
    const newAmPm = e.target.value;
    setAmPm(newAmPm);
    updateTime(hour, minute, newAmPm);
  };

  const updateTime = (newHour, newMinute, newAmPm) => {
    if (newHour !== "" && newMinute !== "" && newAmPm !== "") {
      setTime(`${newHour}-${newMinute}-${newAmPm}`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={hour}
        onChange={handleHourChange}
        className="appearance-none block w-28 border border-gray-300 rounded-md py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        placeholder="HH"
      >
        <option value="">HH</option>
        {[...Array(12).keys()].map((h) => (
          <option key={h + 1} value={(h + 1).toString().padStart(2, "0")}>
            {(h + 1).toString().padStart(2, "0")}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={minute}
        onChange={handleMinuteChange}
        className="appearance-none block w-28 border border-gray-300 rounded-md py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        placeholder="MM"
      >
        <option value="">MM</option>
        {[0, 15, 30, 45, 59].map((m) => (
          <option key={m} value={m.toString().padStart(2, "0")}>
            {m.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        value={amPm}
        onChange={handleAmPmChange}
        className="appearance-none block w-24 border border-gray-300 rounded-md py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <Button
        variant="outlined"
        onClick={() => {
          if (hour !== "" && minute !== "") {
            setConfirm(true);
          }
        }}
      >
        Confirm
      </Button>
    </div>
  );
}

export default TimePicker;
