import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.content = action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
