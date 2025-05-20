import React, { useState, useRef, useEffect } from 'react';
import './TimePicker.css';

export const TimePicker = ({ value, onChange, id = "time-input" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState('07');
  const [minutes, setMinutes] = useState('00');
  const [period, setPeriod] = useState('AM');
  const [view, setView] = useState('clock');
  const pickerRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
    useEffect(() => {
    if (value) {
      const [hourValue, minuteValue] = value.split(':');
      let hourNum = parseInt(hourValue, 10);
      const isPM = hourNum >= 12;
      
      if (hourNum > 12) hourNum -= 12;
      if (hourNum === 0) hourNum = 12;
      
      setHours(hourNum.toString().padStart(2, '0'));
      setMinutes(minuteValue);
      setPeriod(isPM ? 'PM' : 'AM');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const updateTime = (newHours, newMinutes, newPeriod) => {
    let hour24 = parseInt(newHours, 10);
    
    if (newPeriod === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (newPeriod === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    const formattedHours = hour24.toString().padStart(2, '0');
    const formattedMinutes = newMinutes.toString().padStart(2, '0');
    
    onChange(`${formattedHours}:${formattedMinutes}`);
  };

  // Handle hour change
  const handleHourClick = (hourValue) => {
    const newHours = hourValue.toString().padStart(2, '0');
    setHours(newHours);
    updateTime(newHours, minutes, period);
    setView('minutes'); 
  };

  // Handle minute change
  const handleMinuteClick = (minuteValue) => {
    const newMinutes = minuteValue.toString().padStart(2, '0');
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, period);
    setView('clock'); 
  };

  // Handle period change (AM/PM)
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  // Toggle the time picker
  const togglePicker = () => {
    setShowPicker(!showPicker);
    setView('clock'); 
  };

  // Close the picker
  const handleClose = () => {
    setShowPicker(false);
  };

  // Handle OK button 
  const handleOk = () => {
    updateTime(hours, minutes, period);
    setShowPicker(false);
  };

  const getHourHandStyle = () => {
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const hourAngle = ((hour % 12) * 30) + (minute * 0.5);
    
    return {
      transform: `rotate(${hourAngle}deg)`,
    };
  };
  
  const getMinuteHandStyle = () => {
    const minute = parseInt(minutes, 10);
    
    const minuteAngle = minute * 6;
    
    return {
      transform: `rotate(${minuteAngle}deg)`,
    };
  };

  const renderClockNumbers = () => {
    const numbers = [];
    const radius = 70; 
    
    if (view === 'hours') {
      for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        const isActive = parseInt(hours, 10) === i || 
                        (parseInt(hours, 10) === 0 && i === 12) || 
                        (parseInt(hours, 10) === 12 && i === 12);
        
        numbers.push(
          <div
            key={i}
            onClick={() => handleHourClick(i)}
            className={`clock-number hour-number ${isActive ? 'active' : ''}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {i}
          </div>
        );
      }
    } else if (view === 'minutes') {
      for (let i = 0; i < 12; i++) {
        const minuteValue = i * 5;
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        const isActive = Math.floor(parseInt(minutes, 10) / 5) === i;
        
        numbers.push(
          <div
            key={i}
            onClick={() => handleMinuteClick(minuteValue.toString().padStart(2, '0'))}
            className={`clock-number minute-number ${isActive ? 'active' : ''}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {minuteValue}
          </div>
        );
      }
      
      for (let i = 1; i < 60; i++) {
        if (i % 5 !== 0) { 
          const minuteValue = i;
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const x = radius * 0.85 * Math.cos(angle); 
          const y = radius * 0.85 * Math.sin(angle);
          
          const isActive = parseInt(minutes, 10) === i;
          
          numbers.push(
            <div
              key={`min-${i}`}
              onClick={() => handleMinuteClick(minuteValue.toString().padStart(2, '0'))}
              className={`minute-marker ${isActive ? 'active' : ''}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            />
          );
        }
      }
    } else { 
      for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        const isActive = parseInt(hours, 10) === i || 
                        (parseInt(hours, 10) === 0 && i === 12) || 
                        (parseInt(hours, 10) === 12 && i === 12);
        
        numbers.push(
          <div
            key={i}
            className={`clock-number ${isActive ? 'active' : ''}`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {i}
          </div>
        );
      }
    }
    
    return numbers;
  };

  return (
    <div className="time-picker-container" ref={containerRef}>
      <div className="input-with-icon" ref={inputRef}>
        <div className="time-input-container">
          <input
            id={id}
            type="time"
            value={value}
            onChange={handleInputChange}
            onClick={togglePicker}
            className="time-input"
          />
          <span className="input-icon clock-icon" onClick={togglePicker}></span>
        </div>
      </div>
      
      {showPicker && (
        <div 
          className="modern-time-picker" 
          ref={pickerRef}
        >
          {/* Digital Time Display */}
          <div className="digital-display">
            <div className="time-display">
              <input
                className="hours-display"
                type="number"
                min="1"
                max="12"
                value={parseInt(hours, 10)}
                onChange={(e) => {
                  let newValue = e.target.value;
                  if (newValue === '') {
                    setHours('12');
                    return;
                  }
                  
                  let numValue = parseInt(newValue, 10);
                  if (isNaN(numValue) || numValue < 1) numValue = 1;
                  if (numValue > 12) numValue = 12;
                  
                  const formattedHours = numValue.toString().padStart(2, '0');
                  setHours(formattedHours);
                  updateTime(formattedHours, minutes, period);
                }}
                onFocus={() => setView('hours')}
              />
              <div className="time-separator">:</div>
              <input
                className="minutes-display"
                type="number"
                min="0"
                max="59"
                value={parseInt(minutes, 10)}
                onChange={(e) => {
                  let newValue = e.target.value;
                  if (newValue === '') {
                    setMinutes('00');
                    return;
                  }
                  
                  let numValue = parseInt(newValue, 10);
                  if (isNaN(numValue) || numValue < 0) numValue = 0;
                  if (numValue > 59) numValue = 59;
                  
                  const formattedMinutes = numValue.toString().padStart(2, '0');
                  setMinutes(formattedMinutes);
                  updateTime(hours, formattedMinutes, period);
                }}
                onFocus={() => setView('minutes')}
              />
            </div>
            <div className="period-toggle">
              <button 
                className={`period-btn ${period === 'AM' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('AM')}
              >
                AM
              </button>
              <button 
                className={`period-btn ${period === 'PM' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('PM')}
              >
                PM
              </button>
            </div>
          </div>
          
          {/* View Selection Tabs */}
          <div className="view-tabs">
            <button 
              onClick={() => setView('clock')} 
              className={`view-tab ${view === 'clock' ? 'active' : ''}`}
            >
              Clock
            </button>
            <button 
              onClick={() => setView('hours')} 
              className={`view-tab ${view === 'hours' ? 'active' : ''}`}
            >
              Hours
            </button>
            <button 
              onClick={() => setView('minutes')} 
              className={`view-tab ${view === 'minutes' ? 'active' : ''}`}
            >
              Minutes
            </button>
          </div>
          
          {/* Analog Clock */}
          <div className="analog-clock">
            {/* Clock Face */}
            <div className="clock-face">
              {renderClockNumbers()}
              <div className="clock-center"></div>
              {view === 'clock' && (
                <>
                  <div className="hour-hand" style={getHourHandStyle()}></div>
                  <div className="minute-hand" style={getMinuteHandStyle()}></div>
                </>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="picker-actions">
            <button className="picker-btn cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="picker-btn ok-btn" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};