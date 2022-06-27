import {
    createSlice
} from "@reduxjs/toolkit";
import session from "./Session";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "profile";

//... Define Dependencies Scope
const dependencies = {};

// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: null,
        error: null
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
            session.del()
        },
        onUpdate: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                    session.del()
                } else {
                    state.data = action.payload;
                }
            }
        },
        onDelete: (state, action) => {
            state.data = null;
            state.error = null;
            session.del();
        }
    }
});

//... Export the slice as a service
const Service = {
    name,
    reducer: slice.reducer,
    setDependency: (dispatch, useSelector) => {
        dependencies.dispatch = dispatch instanceof Function ? dispatch() : dispatch;
        dependencies.useSelector = useSelector;
    },
    action: {
        delete: () => dependencies.dispatch(slice.actions.onDelete()),
        update: (data) => dependencies.dispatch(slice.actions.onUpdate(data)),
        load: () => dependencies.dispatch((dispatch) => {
            // ... Load reasons from server
            httpReq({
                url: "/api/v1/user/1",
                method: "GET"
            }, dispatch)
                .then(data => dispatch(slice.actions.onUpdate(data)))
                .catch(error => {
                    dispatch(slice.actions.onError(error.message))
                });
        })
    },
    destroy: () => {
        session.del();
        window.location.href = "/";
    },
    selector: {
        data: () => dependencies.useSelector((state) => state[name].data),
        error: () => dependencies.useSelector((state) => state[name].error)
    }
}

export default Service;