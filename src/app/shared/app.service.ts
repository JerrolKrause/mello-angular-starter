import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClient } from 'app-shared';

export type InternalStateType = {
    [key: string]: any
};

@Injectable()
export class AppState {
    
    public usersUrl: string = 'https://jsonplaceholder.typicode.com/users';
    
    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Make get request and cache the result
     * @param updateCache - Pass true to refresh the cache
     */
    public getMockUsers(updateCache?: boolean): Observable<Response> {
        return this.http.get(this.usersUrl, false)
            .map(result => result.json())
            .delay(2000);
    } // end getMockUsersCached

    /**
    * Make a mock rest API call, post
    */
    public postMockUser(user): Observable<Response> {
        return this.http.post(this.usersUrl, user)
            .delay(2000);
        //.map(result => result.json());
    } // end getMockData


    /********************
    * HMR State Management
    *********************/
    public _state: InternalStateType = { };

    // already return a clone of the current state
    public get state() {
        return this._state = this._clone(this._state);
    }
    // never allow mutation
    public set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }

    public get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    public set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }

    private _clone(object: InternalStateType) {
        // simple object clone
        return JSON.parse(JSON.stringify( object ));
    }
    
}