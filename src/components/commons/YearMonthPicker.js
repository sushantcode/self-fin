import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const YearMonthPicker = (props) => {
  const [yearMonth, setYearMonth] = props.dateProps;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        openTo="year"
        views={["year", "month"]}
        label="Year and Month"
        minDate={new Date("2012-03-01")}
        maxDate={new Date()}
        value={new Date(yearMonth)}
        onChange={(date) => setYearMonth(date.toISOString().split("T")[0])}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

export default YearMonthPicker;
