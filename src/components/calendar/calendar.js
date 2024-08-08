import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './calendar.css';

function Calendrier({ onDateRangeChange }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    onDateRangeChange(ranges.selection);
  };

  return (
    <div className='calendar-container'>
      <DateRangePicker
        ranges={dateRange}
        onChange={handleSelect}
        staticRanges={[]}  // Supprimer les options de plage statique
        inputRanges={[]}   // Supprimer les options de plage d'entrée
      />
    </div>
  );
}

export default Calendrier;
