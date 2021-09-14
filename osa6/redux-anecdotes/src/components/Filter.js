import React from 'react'
import { addFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
import Mark from 'mark.js'

const Filter = (props) => {

  const handleChange = (event) => {
    const filter = event.target.value
    props.addFilter(filter)
    const instance = new Mark(document.querySelector(".search-node"))
    instance.unmark()
    instance.mark(filter)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div>
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  addFilter
}

export default connect(null, mapDispatchToProps)(Filter)
