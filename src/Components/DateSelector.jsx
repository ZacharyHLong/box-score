import React from 'react'

const DateSelector = ({ selectedDate, onDateChange}) => {
  const handleChange = (e) => {
    onDateChange(e.target.value)
  }

  return (
    <div>  
      <form>
        <label htmlFor="date">Select a date: </label>
        <input 
        type="date" 
        id="date-selector" 
        value={selectedDate}
        onChange={handleChange}
        />
      </form>
      <p><strong>Note:</strong> dates must be after the start of the 1979 season. Some stats from older games may be missing some data.</p>
    </div>
  )
}

export default DateSelector