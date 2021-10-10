import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/name/' + name + '?fullText=true')
      .then(response => setCountry(response.data))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country[0]) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const name = country[0].name
  const capital = country[0].capital
  const population = country[0].population
  const flag = country[0].flags[0]

  return (
    <div>
      <h3>{name}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <img src={flag} height='100' alt={`flag of ${name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App
