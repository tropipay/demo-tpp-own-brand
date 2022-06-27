import { createSlice } from "@reduxjs/toolkit";

//... Define namespace
const name = "message";

//... Define Dependencies Scope
const dependencies = {};

// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        message: null,
        code: null,
        type: null,
        path: null,
        group: null,
    },
    reducers: {
        onUpdate: (state, action) => {
            if (typeof (action.payload) === 'object') {
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.type = action.payload.type;
                state.path = action.payload.path;
                state.group = action.payload.group;
            } else {
                state.message = action.payload;
            }
        },
        onClean: (state, action) => {
            state.message = null;
            state.code = null;
            state.type = null;
            state.path = null;
            state.group = null;
        }
    }
});

//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    setDependency: (dispatch, useSelector) => {
        dependencies.dispatch = dispatch instanceof Function && dispatch.name === 'useDispatch' ? dispatch() : dispatch;
        dependencies.useSelector = useSelector;
    },
    action: {
        update: (data) => dependencies.dispatch(slice.actions.onUpdate(data)),
        clean: () => dependencies.dispatch(slice.actions.onClean())
    },
    selector: {
        error: () => dependencies.useSelector(state => state[name].message),
        code: () => dependencies.useSelector(state => state[name].code),
        type: () => dependencies.useSelector(state => state[name].type),
        path: () => dependencies.useSelector(state => state[name].path),
        group: () => dependencies.useSelector(state => state[name].group),
    }
}
export default Service;