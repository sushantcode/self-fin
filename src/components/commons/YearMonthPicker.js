import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateUtil } from '../../utils/DateUtil';

const YearMonthPicker = (props) => {
  const [yearMonth, setYearMonth] = props.dateProps;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        openTo="year"
        views={['year', 'month']}
        label={props.datePickerLabel}
        minDate={props.minDate}
        maxDate={new Date()}
        value={new Date(yearMonth)}
        onChange={(date) =>
          setYearMonth(
            DateUtil.getLocalDateInISOFormat(date.toLocaleDateString())
          )
        }
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

export default YearMonthPicker;
