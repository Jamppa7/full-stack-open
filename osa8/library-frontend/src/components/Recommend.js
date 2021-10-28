import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_BOOKS } from '../queries'

const Recommend = ({ show, favoriteGenre }) => {
  const [books, setBooks] = useState(null)

  const [getBooks, result] = useLazyQuery(FIND_BOOKS)

  useEffect(() => {
    getBooks({ variables: { genreToSearch: favoriteGenre } })

    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
