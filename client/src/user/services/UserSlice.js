import { createSlice } from "@reduxjs/toolkit";
import httpReq from '../../app/services/HttpRequest';
import { exec } from "../../app/services/util";

//... Define namespace
const name = "user";

//... Define Dependencies Scope
const dependencies = {};

// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        data: null,
        error: null,
        loginUrl: '#'
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
        },
        onUpdate: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.data = action.payload;
                }
            }
        },
        onLoginUrl: (state, action) => {
            console.log('onLoginUrl', action.payload);
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.loginUrl = action.payload.url;
                }
            }
            console.log('onLoginUrl-state', state.loginUrl);
        },
        onDelete: (state, action) => {
            state.data = null;
            state.error = null;
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
        getLoginUrl: () => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/signin?redirect=none",
                method: "GET"
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        dispatch(slice.actions.onLoginUrl(data));
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
        load: () => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/1",
                method: "GET"
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        dispatch(slice.actions.onUpdate(data));
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
        validate: (payload, callback = null) => dependencies.dispatch((dispatch) => {
            if (!payload) return false;
            payload.resource = payload.resource || 'email';
            httpReq({
                url: "/api/v1/user/validate",
                method: "post",
                data: payload
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        exec(callback, [data]);
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
        sendCode: (payload, callback = null) => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/send/code",
                method: "post",
                data: payload
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        exec(callback, [data]);
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
    },
    destroy: () => {
        window.location.href = "/";
    },
    selector: {
        loginUrl: () => dependencies.useSelector((state) => state[name].loginUrl),
        data: () => dependencies.useSelector((state) => state[name].data),
        error: () => dependencies.useSelector((state) => state[name].error)
    }
}

export default Service;