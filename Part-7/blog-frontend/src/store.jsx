import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import errorMessageReducer from './reducers/errorMessageReducer'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    login: loginReducer,
    errorMessage: errorMessageReducer
  }
})

export default store
