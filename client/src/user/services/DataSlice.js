import { createSlice } from "@reduxjs/toolkit";
import httpReq from '../../app/services/HttpRequest';

//... Define namespace
const name = "data";

//... Define Dependencies Scope
const dependencies = {};

// ... Create Slice
export const slice = createSlice({
    name,
    initialState: {
        countries: [],
        occupations: [],
        locations: [],
        error: null
    },
    reducers: {
        onError: (state, action) => {
            state.error = action.payload;
        },
        onLocations: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.locations = action.payload.data;
                    console.log('onLocations', action.payload.data)
                }
            }
        },
        onOccupations: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.occupations = action.payload.data;
                    console.log('getOccupations', action.payload.data)
                }
            }
        },
        onCountries: (state, action) => {
            if (action.payload) {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.countries = action.payload.data;
                    console.log('onCountries', action.payload.data)
                }
            }
        },
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
        getCountries: () => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/data/country",
                method: "GET"
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        dispatch(slice.actions.onCountries(data));
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
        getOccupations: () => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/data/occupations",
                method: "GET"
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        dispatch(slice.actions.onOccupations(data));
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
        getLocations: () => dependencies.dispatch((dispatch) => {
            httpReq({
                url: "/api/v1/user/data/locations",
                method: "GET"
            }, dispatch)
                .then(data => {
                    if (!data || data.error) {
                        dispatch(slice.actions.onError(data.error));
                    } else {
                        dispatch(slice.actions.onLocations(data));
                    }
                })
                .catch(error => dispatch(slice.actions.onError(error.message)));
        }),
    },
    selector: {
        locations: () => dependencies.useSelector((state) => state[name].locations),
        occupations: () => dependencies.useSelector((state) => state[name].occupations),
        countries: () => dependencies.useSelector((state) => state[name].countries),
        error: () => dependencies.useSelector((state) => state[name].error)
    }
}

export default Service;