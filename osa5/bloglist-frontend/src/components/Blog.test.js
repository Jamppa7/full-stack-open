import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog, user, update, remove, component

  beforeEach(() => {
    blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 777,
      user: '1234567'
    }

    user = {
      username: 'kayttaja',
      password: 'salasana'
    }

    update = jest.fn()
    remove = jest.fn()

    component = render(
      <Blog blog={blog} user={user} update={update} remove={remove} />
    )
  })

  test('renders title and author, but not url and likes', () => {
    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Michael Chan'
    )
    expect(component.container).not.toHaveTextContent(
      'https://reactpatterns.com/'
    )
    expect(component.container).not.toHaveTextContent(
      '777'
    )
  })

  test('renders all title, author, url and likes', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Michael Chan'
    )
    expect(component.container).toHaveTextContent(
      'https://reactpatterns.com/'
    )
    expect(component.container).toHaveTextContent(
      '777'
    )
  })

  test('two presses of like button cause two eventhandler calls', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(update.mock.calls).toHaveLength(2)
  })
})
