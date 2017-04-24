//Actions
export const StoreMainActions = {
    RESET_STATE: 'RESET_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
    
    USERS_LOAD: 'USERS_LOAD', //Make GET request from API
    USERS_LOADED: 'USERS_LOADED', //On success, load into store

    USERS_ADD: 'USERS_ADD', // Make POST to API
    USERS_ADDED: 'USERS_ADDED', // On success, load into store

    MODAL : 'MODAL', //??? Add modals to state management

    // Holds success responses, usually for API interaction
    SUCCESS: 'SUCCESS',
    // Waiting/In progress, usually for API interaction
    WAITING: 'WAITING',
    //Error handling, usually for API interaction
    ERRORS: 'ERRORS'
};

//Define initial store state
const initialLoanState: IStoreMain = {
    users: [],
    waiting: {},
    success: {},
    errors: {}
};

export function StoreMainReducer(state: IStoreMain = initialLoanState, { type, payload }) {
    //console.log('STORE REDUCER:', type, payload);

    switch (type) {
        //Reset State
        case StoreMainActions.RESET_STATE:
            
            return {
                users: [],
                waiting: {},
                success: {},
                errors: {}
            };

        //Force a restore refresh
        case StoreMainActions.REFRESH_STATE:
            return Object.assign({}, state);
            
        //Users loaded from API
        case StoreMainActions.USERS_LOADED:
            state.errors[StoreMainActions.USERS_LOAD] = false; // Reset errors
            state.waiting[StoreMainActions.USERS_LOAD] = false; // Reset waiting
           
            //state.users = payload;
            return Object.assign({},
                state,
                { users: payload }
            );

        //User posted successfully to API
        case StoreMainActions.USERS_ADDED:
            state.users = [payload, ...state.users];
            state.errors[StoreMainActions.USERS_ADD] = false; // Reset errors
            state.waiting[StoreMainActions.USERS_ADD] = false; // Reset waiting
            state.success[StoreMainActions.USERS_ADD] = true; // Set success to true
            return Object.assign({}, state);


        // Dictionary actions for handling API states
        // Waiting or in progress actions, uses dictionary method that corresponds to the reducer action
        case StoreMainActions.WAITING:
            state.errors[payload] = false; // Reset errors
            state.success[payload] = false; // Reset success
            state.waiting[payload] = true; // Set waiting to true
            return Object.assign({}, state);

        // Error handling, uses dictionary method that corresponds to the reducer action
        case StoreMainActions.ERRORS:
            state.waiting[payload] = false; // Reset waiting
            state.success[payload] = false; // Reset success
            state.errors[payload] = true; // Set error to true
            return Object.assign({}, state);

        //No type specified, return default state
        default:
            return state;
    }

    //console.log('WTF')
}