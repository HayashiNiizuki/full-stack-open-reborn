import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import errorMessageReducer from './reducers/errorMessageReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    errorMessage: errorMessageReducer
  }
})

export default store
