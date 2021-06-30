import React from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        languages
        <ul>
          {country.languages.map((lang, key) =>
            <li key={lang.iso639_1}>{lang.name}</li>
          )}
        </ul>
        <img alt='' className="flag" src={country.flag}/>
    </div>
  )
}

export default Country
