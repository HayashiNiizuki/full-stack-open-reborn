import { beforeEach, describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

describe('<NewBlog />', () => {
  let container
  let mockHandler

  beforeEach(() => {
    mockHandler = vi.fn()
    container = render(<NewBlog addNewBlog={mockHandler}></NewBlog>).container
  })

  test('add new blog func received correct prop', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('type title here')
    const authorInput = screen.getByPlaceholderText('type author here')
    const urlInput = screen.getByPlaceholderText('type your url here')

    await userEvent.type(titleInput, 'test input title...')
    await userEvent.type(authorInput, 'test input author...')
    await userEvent.type(urlInput, 'test input url...')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
      title: 'test input title...',
      author: 'test input author...',
      url: 'test input url...'
    })
  })
})
