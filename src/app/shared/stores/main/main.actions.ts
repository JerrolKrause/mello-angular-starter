import { Injectable } from "@angular/core";


@Injectable()
export class StoreMainActions {

    public actions = StoreMainActionsBase;

    public api = {
        auth: {
            method: ['this.icws.Status.GetAccessibleStatus'],
            action: this.actions.USERS_LOAD
        },
        api: {
        },
        user: {
            statuses: [1, 2, 3, 4, 5]
        }
    };

    constructor(

    )
    {

        this.createSelectors(this.api);

        console.warn('1 ',this.api);
        let path = 'user.statuses';
       
        this.updateNestedProperty(this.api, path, [12345]);
        console.warn('2 ', this.api);
        //console.warn('Final Output', this.api);
    }

    updateNestedProperty(obj: any, path: any, value: any) {
        if (typeof path == 'string')
            return this.updateNestedProperty(obj, path.split('.'), value);
        else if (path.length == 1 && value !== undefined)
            return obj[path[0]] = value;
        else if (path.length == 0)
            return obj;
        else
            return this.updateNestedProperty(obj[path[0]], path.slice(1), value);
    }



    /**
     * Create a unique ID for each Effect entry
     * @param element - An object to recurse through
     * @param selector - Holds a string of the path down through an object
     */
    createSelectors(element: any, selector: string = '') {
        // Loop through all props in the object
        for (var key in element) {
            // Make sure we're not in the prototype
            if (element.hasOwnProperty(key)) {
                //If this is not null, is an object, has properties, does not have an action property
                if (element[key] !== null && typeof element[key] === 'object' && Object.keys(element[key]).length && !element[key].action) {
                    let newSelector = selector += key.charAt(0).toUpperCase() + key.slice(1); // Append this object property to the selector slug
                    this.createSelectors(element[key], newSelector); // Then recurse
                }
                // If has action property
                else if (element[key].action) {
                    element[key].id = selector + key.charAt(0).toUpperCase() + key.slice(1); // Create the final unique id for this effect
                }
            }
        }
    } // end createSelectors

}

//Actions
export const StoreMainActionsBase = {
    RESET_STATE: 'RESET_STATE',
    REFRESH_STATE: 'REFRESH_STATE',

    ADD_AUTH_DATA: 'ADD_AUTH_DATA',
    
    SUCCESS: 'SUCCESS', // Holds success responses, usually for API interaction
    WAITING: 'WAITING', // Waiting/In progress, usually for API interaction
    ERRORS: 'ERRORS', //Error handling, usually for API interaction

    // Scaffolding, can be removed
    USERS_LOAD: 'USERS_LOAD', //Make GET request from API
    USERS_LOADED: 'USERS_LOADED', //On success, load into store
    USERS_ADD: 'USERS_ADD', // Make POST to API
    USERS_ADDED: 'USERS_ADDED', // On success, load into store
    TEST: 'TEST'
};

