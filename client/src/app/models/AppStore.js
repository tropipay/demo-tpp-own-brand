import { configureStore } from '@reduxjs/toolkit';

import MessageSlice from '../services/MessageSlice';
import Profile from '../../security/services/ProfileSlice';

export default configureStore({
  reducer: {
    [Profile.name]: Profile.reducer,
    [MessageSlice.name]: MessageSlice.reducer
  }
});
