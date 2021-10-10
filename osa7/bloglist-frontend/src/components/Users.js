import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const Users = ({ users, blogs }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {[...blogs.filter(blog => blog.user.username === user.username)].length} blogs created
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

Users.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Users
