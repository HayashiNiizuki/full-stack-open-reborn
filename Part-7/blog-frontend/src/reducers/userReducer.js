import { createSlice } from '@reduxjs/toolkit'

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

export const login = (user) => {
  return (dispatch) => {
    dispatch(userSlice.actions.login(user))
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.logout())
  }
}

export default userSlice.reducer