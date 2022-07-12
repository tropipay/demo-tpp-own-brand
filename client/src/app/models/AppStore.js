import { configureStore } from '@reduxjs/toolkit';

import MessageSlice from '../services/MessageSlice';
import Profile from '../../security/services/ProfileSlice';
import Reason from '../services/ReasonSlice';
import User from '../../user/services/UserSlice';
import Data from '../../user/services/DataSlice';

export default configureStore({
  reducer: {
    [Data.name]: Data.reducer,
    [User.name]: User.reducer,
    [Reason.name]: Reason.reducer,
    [Profile.name]: Profile.reducer,
    [MessageSlice.name]: MessageSlice.reducer
  }
});
