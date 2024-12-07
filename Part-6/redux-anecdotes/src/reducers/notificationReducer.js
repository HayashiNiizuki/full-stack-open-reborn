import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showing: false,
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload
      state.showing = true
    },
    hideNotification(state) {
      state.showing = false
    }
  }
})

export const showTempNotification = (message, displayTime) => async (dispatch) => {
  dispatch(showNotification(message))

  await new Promise((resolve) => setTimeout(resolve, displayTime * 1000))

  dispatch(hideNotification())
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
