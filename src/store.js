import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './redux/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer
  }
});
