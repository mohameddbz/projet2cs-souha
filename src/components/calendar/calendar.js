import React , {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'

function Calendrier() {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => setDate(date);

  return (
    <div className='calendar-container'>
      <Calendar onChange={onChange} value={date}/>
    </div>
  );
}
export default Calendrier;