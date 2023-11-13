import React, { useState, useEffect } from 'react';

const TimestampConverter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [inputTime, setInputTime] = useState<string>('');
  const [outputTime, setOutputTime] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<string>('seconds');

  const [inputTimeUTC, setInputTimeUTC] = useState<string>('');
  const [utcOutputTime, setUtcOutputTime] = useState<string>('');
  const [timeUnitUTC] = useState<string>('seconds');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (timeUnit === 'milliseconds') {
        setCurrentTime(now.toISOString());
      } else {
        setCurrentTime(Math.floor(now.getTime() / 1000).toString());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeUnit]);

  const handleConvert = () => {
    const inputTimestamp = parseInt(inputTime, 10);

    if (!isNaN(inputTimestamp)) {
      const date = new Date(timeUnit === 'milliseconds' ? inputTimestamp : inputTimestamp * 1000);
      setOutputTime(date.toISOString());
    } else {
      setOutputTime('Invalid timestamp');
    }
  };

  const handleUTCConvert = () => {
    const customDate = new Date(inputTimeUTC);
    if (!isNaN(customDate.getTime())) {
      setUtcOutputTime(timeUnit === 'milliseconds' ? customDate.getTime().toString() : Math.floor(customDate.getTime() / 1000).toString());
    } else {
      setUtcOutputTime('Invalid date');
    }
  };

  return (
    <div>
      <div>
        <label>Current Time: {currentTime}</label>
      </div>
      <div>
        <label>
          Input Time:
          <input
            type="text"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
          />
        </label>
        <select onChange={(e) => setTimeUnit(e.target.value)} value={timeUnit}>
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </select>
        <button onClick={handleConvert}>Convert</button>
        <label>Output Time: {outputTime}</label>
      </div>

      // 将时间从utc格式转化成时间戳形式
      <div>
        <label>
          Input Time:
          <input
            type="text"
            value={inputTimeUTC}
            onChange={(e) => setInputTimeUTC(e.target.value)}
          />
        </label>
        <button onClick={handleUTCConvert}>Convert</button>
        <label>Output Time: {utcOutputTime}</label>
        <select onChange={(e) => setTimeUnit(e.target.value)} value={timeUnitUTC}>
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </select>
      </div>
    </div>
  );
};

export default TimestampConverter;
