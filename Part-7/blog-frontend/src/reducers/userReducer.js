import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    }
  }
})

export const setUser = (user) => {
  return async (dispatch) => {
    const ruser = await dispatch(userSlice.actions.login(user))
    blogService.setToken(ruser ? ruser.token : null)
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(userSlice.actions.login(user))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    setUser(null)
    blogService.setToken(null)
    delete window.localStorage.loggedNoteappUser
    dispatch(userSlice.actions.logout())
  }
}

export default userSlice.reducer
