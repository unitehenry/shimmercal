import { useState } from 'react';

import Calendar from 'react-calendar'
import Confirmation from './Confirmation';
import 'react-calendar/dist/Calendar.css'
import './Schedule.css'
import moment from 'moment';

const defaultTimeSlots = [
  '9:00am', '9:30am', '10:00am',
  '10:30am', '11:00am', '11:30am',
  '12:00pm', '12:30pm', '1:00pm',
  '1:30pm', '2:00pm', '2:30pm', '3:00pm'
]

export default function Schedule() {

  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ selectedTime, setSelectedTime ] = useState(null);
  const [ confirmationDate, setConfirmationDate ] = useState(null);

  const onNextClick = () => {
    const nextDate = moment(selectedDate);
    const [ hourString, minuteString ] = selectedTime.split(':');
    let hour = parseInt(hourString);
    if (minuteString.includes('pm')) hour += 12;
    const minute = parseInt(minuteString.substring(0, 2));
    nextDate.set('hour', hour);
    nextDate.set('minute', minute);
    setConfirmationDate(nextDate);
  }

  const onConfirm = () => alert('confirm');

  if (confirmationDate) {
    return <Confirmation
      confirmationDate={confirmationDate}
      onConfirm={onConfirm} />;
  }

  return (
    <div className="w-[650px] h-fit shadow-lg bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-gray-800 text-xl">
            When would you like to meet?
          </h1>
          <span className="text-gray-600">
            Select a date from below
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
          <div className={ selectedDate ? 'col-span-2' : 'col-span-3' }>
            <Calendar
              minDate={new Date()}
              onChange={setSelectedDate} />
          </div>
          <div className={selectedDate ? 'col-span-1' : 'hidden'}>
            { moment(selectedDate).format('dddd, MMMM Do') }
            <div className="flex flex-col gap-1 h-[300px] overflow-auto">
              { defaultTimeSlots.map(slot => {
                  if (selectedTime === slot) {
                    return (
                      <div className="w-full flex gap-1" key={slot}>
                        <div
                          className="w-full border border-blue-500 bg-blue-100 px-4 py-2 rounded cursor-pointer">
                            { slot }
                        </div>
                        <button
                          className="w-full border border-blue-500 px-4 py-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                          onClick={onNextClick}>
                          Next
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`border border-blue-500 px-4 py-2 rounded cursor-pointer hover:bg-blue-100`}
                      onClick={() => setSelectedTime(slot)} key={slot}>
                        { slot }
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
