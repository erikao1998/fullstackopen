import React from 'react'

const PersonForm = ({ add, handleName, handleNumber, name, number }) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={add}>
        <div>
          name:
          <input
            value={name}
            onChange={handleName}
          />
        </div>
        <div>
          number:
          <input
            value={number}
            onChange={handleNumber}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}


export default PersonForm
