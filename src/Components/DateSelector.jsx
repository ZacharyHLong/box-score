import React from 'react'
import './DateSelector.css'

const DateSelector = ({ selectedDate, onDateChange}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st'
      : (day === 2 || day === 22) ? 'nd'
      : (day === 3 || day === 23) ? 'rd'
      : 'th'
    return `${day}${suffix} ${month} ${year}`
  }

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
      <div className="date-change-container">
        <form>
          <label htmlFor="date">Select a date: </label>
          <input 
          type="date" 
          id="date-selector" 
          value={selectedDate}
          onChange={handleChange}
          />
        </form>
        {selectedDate !== '' && (
          <div className="date-box">
            <button onClick={handlePreviousDayClick}>Previous day</button>
            <h2> Stats from {formatDate(selectedDate)}</h2>
            <button onClick={handleNextDayClick}>Next day</button>
          </div>
        )}
      </div>
      <p><strong>Note:</strong> dates must be after the start of the 1979 season. Some stats from older games may be missing some data.</p>
    </div>
  )
}

export default DateSelector