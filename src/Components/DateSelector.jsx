import React from 'react'

const DateSelector = ({ selectedDate, onDateChange}) => {
  const handleChange = (e) => {
    onDateChange(e.target.value)
  }

  const handlePreviousDayClick = () => {
    const currentDate = new Date(selectedDate)
    currentDate.setDate(currentDate.getDate() - 1)
    onDateChange(currentDate.toISOString().split('T')[0])
  }

  const handleNextDayClick = () => {
    const currentDate = new Date(selectedDate)
    currentDate.setDate(currentDate.getDate() + 1)
    onDateChange(currentDate.toISOString().split('T')[0])
  }


  return (
    <div>  
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
        <div>
          <button onClick={handlePreviousDayClick}>Previous day</button>
          <button onClick={handleNextDayClick}>Next day</button>
        </div>
      </div>
      <p><strong>Note:</strong> dates must be after the start of the 1979 season. Some stats from older games may be missing some data.</p>
    </div>
  )
}

export default DateSelector