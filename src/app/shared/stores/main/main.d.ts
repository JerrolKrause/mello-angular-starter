
export declare namespace State {
    
    interface global {
        main: main
    }

    // Type for main store. Located in the reducer
    interface main {
        auth?: any;
        api?: {
            waiting?: any,
            success?: any,
            errors?: any
        },

        // Scaffolding, can be removed
        users?: any[]; // Just for demo purposes, coming from https://jsonplaceholder.typicode.com/users
    }

}