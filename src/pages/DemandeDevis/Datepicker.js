import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const CustomDatePicker = ({ selectedDate, handleDateChange, placeholderText }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  const handleChange = date => {
    setStartDate(date);
    // handleDateChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      placeholderText={placeholderText} // Pass placeholder text from prop
    />
  );
};

export default CustomDatePicker;
