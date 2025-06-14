import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: null,
  reducers: {
    setErrorMessage(state, action) {
      return action.payload
    },
    clearErrorMessage(state, action) {
      return null
    }
  }
})

export const { setErrorMessage, clearErrorMessage } = errorMessageSlice.actions

export const setError = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message))
    setTimeout(() => {
      dispatch(clearErrorMessage())
    }, timeout * 2500)
  }
}

export default errorMessageSlice.reducer
