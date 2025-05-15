import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
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

export const setLogin = (user) => {
  return async (dispatch) => {
    const ruser = await dispatch(loginSlice.actions.login(user))
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
      setLogin(user)
      dispatch(loginSlice.actions.login(user))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    setLogin(null)
    blogService.setToken(null)
    delete window.localStorage.loggedNoteappUser
    dispatch(loginSlice.actions.logout())
  }
}

export default loginSlice.reducer
