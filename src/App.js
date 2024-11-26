import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [showDot, setShowDot] = useState(true);
  const [alarmTime, setAlarmTime] = useState(null);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  
  // const tickSound = useRef(new Audio('tickSound3.wav'));
  // const chimeSound = useRef(new Audio('chimeSound.mp3'));
  // const alarmSound = useRef(new Audio('alarmSound.wav'));

  const updateClock = () => {
    const now = new Date();

    setShowDot((prev) => !prev);

    setTime({
      hours: String(now.getHours()).padStart(2, '0'),
      minutes: String(now.getMinutes()).padStart(2, '0'),
      seconds: String(now.getSeconds()).padStart(2, '0'),
    });

    setCurrentDay(now.getDay());

    // Play tick sound
    // tickSound.current.play();

    // Play chime sound every minute
    if (now.getSeconds() === 0) {
      // chimeSound.current.play();
    }

    // Check alarm
    if (alarmTime && now.toTimeString().startsWith(alarmTime)) {
      // alarmSound.current.play();
      alert('Alarm ringing!');
      setAlarmTime(null); // Reset alarm
    }
  };

  const setAlarm = () => {
    const alarmInput = document.getElementById('alarmTime');
    if (alarmInput.value) {
      setAlarmTime(alarmInput.value);
      alert(`Alarm set for ${alarmInput.value}`);
    } else {
      alert('Please select a valid time for the alarm.');
    }
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [alarmTime]);

  return (
    <div className="container">
      <div className="digiCl">
        <div className="week">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className={index === currentDay ? 'active' : ''}>
              {day}
            </div>
          ))}
        </div>
        <div className="time">
          <div className="hour">{time.hours}</div>
          <div className={`dot ${showDot ? 'invisible' : ''}`}>:</div>
          <div className="min">{time.minutes}</div>
          <div className={`dot ${showDot ? 'invisible' : ''}`}>:</div>
          <div className="sec">{time.seconds}</div>
        </div>
      </div>
      <div className="footer">Enhanced Digital Clock</div>
      <div className="alarm">
        <input type="time" id="alarmTime" />
        <button onClick={setAlarm}>Set Alarm</button>
      </div>
    </div>
  );
}

export default App;
