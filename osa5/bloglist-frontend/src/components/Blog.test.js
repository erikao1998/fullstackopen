import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  'title': 'test',
  'author': 'test author',
  'url': 'test_url',
  'likes': 1
}

test('renders content', () => {

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')

})

test('shows url and likes', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.togglableContent')
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
})

test('clicking the button twice calls event handler twice', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const view = component.getByText('view')
  fireEvent.click(view)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
