import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const Filter = ({handleChange}) => {
  return (
    <div>
      find countries
      <input
        onChange={handleChange}
      />
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch (event.target.value)
  }

  const filtered = () => {
    const filteredList = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    return filteredList
  }

  const showOne = (name) => {
    setSearch(name)

  }

  return (
    <div>
      <Filter handleChange={handleSearch}/>
      {filtered().length > 10
      ? <div>
          Too many searches, specify another filter
        </div>

      : filtered().length === 1

      ? filtered().map((country, key) =>
          <div key={country.name}>
            <Country country={country}/>
          </div>
        )
      : filtered().map((country, key) =>
          <div key={country.name}>
            {country.name}
            <button onClick={() => showOne(country.name)} >show</button>
          </div>

        )

      }
    </div>
  )
}

export default App;
