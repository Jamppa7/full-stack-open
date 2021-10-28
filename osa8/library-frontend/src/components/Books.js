import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_BOOKS } from '../queries'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('all')
  const [booksByGenre, setBooksByGenre] = useState(null)

  const [getBooksByGenre, result] = useLazyQuery(FIND_BOOKS)

  useEffect(() => {
    if (genre === 'all') {
      setBooksByGenre(books)
    } else {
      getBooksByGenre({ variables: { genreToSearch: genre } })

      if (result.data) {
        setBooksByGenre(result.data.allBooks)
      }
    }
  }, [result.data, genre]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
