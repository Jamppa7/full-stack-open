import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import CountriesToShow from './components/CountriesToShow'
import CountryList from './components/CountryList'
import CountryData from './components/CountryData'
import WeatherData from './components/WeatherData'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showCountry = name => {
    setNewFilter(name)
  }

  const filtered = CountriesToShow(countries, newFilter)
  var lenFiltered = filtered.length

  if (lenFiltered > 1 && lenFiltered <= 10) {
    return (
      <div>
        <FilterForm filter={newFilter} handleFilter={handleFilterChange} />
        {filtered.map(c =>
          <CountryList key={c.name} name={c.name} show={() => showCountry(c.name)} />
        )}
      </div>
    )
  } else if (lenFiltered === 1) {
    return (
      <div>
        <FilterForm filter={newFilter} handleFilter={handleFilterChange} />
        {filtered.map(c =>
          <CountryData key={c.name} name={c.name} capital={c.capital} population={c.population} languages={c.languages} flag={c.flag} />
        )}
        {filtered.map(c =>
          <WeatherData key={c.name} capital={c.capital} />
        )}
      </div>
    )
  } else {
    return (
      <div>
        <FilterForm filter={newFilter} handleFilter={handleFilterChange} />
        Too many matches, specify another filter.
      </div>
    )
  }
}

export default App
