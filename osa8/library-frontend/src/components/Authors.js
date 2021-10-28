import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = ({ show, setError, authors, showSetBirth }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [selectedName, setSelectedName] = useState(null)

  const names = []

  const [changeYear] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (selectedName !== null) {
      setName(selectedName.value)
    }
  }, [selectedName])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if (!name || !year) {
      setError('required input is missing')
    } else {
      changeYear({ variables: { name, year } })
      setYear('')
    }
  }

  if (!showSetBirth) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          {authors.forEach(a => {
            names.push({ value: a.name, label: a.name })
          })}
        </div>
        <div>
          <Select
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={names}
          />
        </div>
        <div>
          born <input
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
