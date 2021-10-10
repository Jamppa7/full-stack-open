import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs
