import { configureStore } from '@reduxjs/toolkit';

import MessageSlice from '../services/MessageSlice';
import Profile from '../../security/services/ProfileSlice';
import Reason from '../services/ReasonSlice';

export default configureStore({
  reducer: {
    [Reason.name]: Reason.reducer,
    [Profile.name]: Profile.reducer,
    [MessageSlice.name]: MessageSlice.reducer
  }
});
