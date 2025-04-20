import { beforeEach, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const _blog = {
    title: '译文 | 马克·费舍：什么是“魔幻唯意志论”',
    author: '海螺Caracoles',
    url: 'https://mp.weixin.qq.com/s/8Wr-GusCVpKKuglS0KsncA',
    likes: 903
  }

  beforeEach(() => {
    container = render(<Blog _blog={_blog} canDelete={false}></Blog>).container
  })

  test('show title', () => {
    const element = screen.getByText(_blog.title)
    expect(element).toBeDefined()
  })

  test('not show author url likes', () => {
    const div = container.querySelector('.hideContents')
    expect(div).toHaveStyle('display: none')
  })

  test('show author .etc after click view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)
    const div = container.querySelector('.hideContents')
    expect(div).toHaveStyle('display: block')
  })
})
