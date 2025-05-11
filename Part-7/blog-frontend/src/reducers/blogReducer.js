import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createSelector } from 'reselect'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const updatedBlog = action.payload.newBlog
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogSlice.actions.setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createNew(newBlog)
    dispatch(blogSlice.actions.createBlog(createdBlog))
    return createdBlog
  }
}

export const updateBlog = ({ id, newBlog }) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog({ id, newBlog })
    dispatch(blogSlice.actions.updateBlog({ id, newBlog: updatedBlog }))
    return updatedBlog
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(blogSlice.actions.deleteBlog({ id }))
  }
}

const selectBlogList = (state) => state.blog

export const selectSortedBlogs = createSelector([selectBlogList], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
)

export default blogSlice.reducer
