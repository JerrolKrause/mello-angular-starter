import { State, StoreMainActionsBase } from 'app-shared';


//Define initial store state
const initialLoanState: State.main = {
    users: [],
    auth: {},
    api: {
        waiting: {},
        success: {},
        errors: {}
    }
};

export function StoreMainReducer(state: State.main = initialLoanState, { type, payload }) {
    //console.log('STORE REDUCER:', type, payload);

    /**
     * Loop through an object and add its key/value pairs to local storage
     * @param data - Any object of data
     */
    const addToStorage = (data: object) => {
        Object.keys(data).forEach((key) => {
            window.sessionStorage.setItem(key, data[key]);
            if (key == 'csrfToken') {
                window.sessionStorage.setItem('icwsToken', data[key]);
            }
        });
    }

    const updateNestedProperty = (obj, is, value) => {
        if (typeof is == 'string')
            return updateNestedProperty(obj, is.split('.'), value);
        else if (is.length == 1 && value !== undefined)
            return obj[is[0]] = value;
        else if (is.length == 0)
            return obj;
        else
            return updateNestedProperty(obj[is[0]], is.slice(1), value);
    }

    switch (type) {
        //Reset State
        case StoreMainActionsBase.RESET_STATE:
            
            return initialLoanState;

        //Force a restore refresh
        case StoreMainActionsBase.REFRESH_STATE:
            return Object.assign({}, state);

        // Manage simple status changes such as logged in or out
        case StoreMainActionsBase.ADD_AUTH_DATA:
            addToStorage(payload);
            let newAuth = Object.assign({}, state.auth, payload);
            return Object.assign({}, state, { auth: newAuth });

        //Users loaded from API
        case StoreMainActionsBase.USERS_LOADED:
            state.api.errors[StoreMainActionsBase.USERS_LOAD] = false; // Reset errors
            state.api.waiting[StoreMainActionsBase.USERS_LOAD] = false; // Reset waiting
           
            //state.users = payload;
            return Object.assign({},
                state,
                { users: payload }
            );

        //User posted successfully to API
        case StoreMainActionsBase.USERS_ADDED:
            state.users = [payload, ...state.users];
            state.api.errors[StoreMainActionsBase.USERS_ADD] = false; // Reset errors
            state.api.waiting[StoreMainActionsBase.USERS_ADD] = false; // Reset waiting
            state.api.success[StoreMainActionsBase.USERS_ADD] = true; // Set success to true
            return Object.assign({}, state);


        // Dictionary actions for handling API states
        // Waiting or in progress actions, uses dictionary method that corresponds to the reducer action
        case StoreMainActionsBase.WAITING:
            delete state.api.errors[payload]; // Reset errors
            delete state.api.success[payload]; // Reset success
            state.api.waiting[payload] = true; // Set waiting to true
            return Object.assign({}, state);

        // Dictionary actions for handling API states
        // Success state
        case StoreMainActionsBase.SUCCESS:
            delete state.api.errors[payload]; // Reset errors
            delete state.api.waiting[payload]; // Reset success
            state.api.success[payload] = true; // Set waiting to true
            return Object.assign({}, state);

        // Error handling, uses dictionary method that corresponds to the reducer action
        case StoreMainActionsBase.ERRORS:
            delete state.api.waiting[payload.id]; // Reset waiting
            delete state.api.success[payload.id]; // Reset success
            state.api.errors[payload.id] = payload.response; // Set error to server message OR true if not supplied
            return Object.assign({}, state);

        //No type specified, return default state
        default:
            return state;
    }

    //console.log('WTF')
}