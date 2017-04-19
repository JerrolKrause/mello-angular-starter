import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StoreMainActions } from "app-shared";

import { AppState } from 'app-shared';


@Injectable()
export class StoreMainEffects {

    constructor(
        private action$: Actions,
        private appState: AppState)
    { }

    //Get mock data from the API and update the store
    @Effect() getUsers = this.action$
        .ofType(StoreMainActions.USERS_LOAD) // 
        .map(toPayload)
        .switchMap(payload => {
            return this.appState.getMockUsers() // Call to service
                .map(result => ({ type: StoreMainActions.USERS_LOADED, payload: result }))
                .catch(() => Observable.of({ type: StoreMainActions.ERRORS, payload: 'USERS_LOAD' }))
        });
    
    //Post data to the API
    @Effect() postUser = this.action$
        .ofType(StoreMainActions.USERS_ADD) //
        .map(toPayload)
        .switchMap(payload => {
            return this.appState.postMockUser(payload).delay(2000) // Call to service
                .map(result => ({ type: StoreMainActions.USERS_ADDED, payload: result.json() }))
                .catch(() => Observable.of({ type: StoreMainActions.ERRORS, payload: 'USERS_ADD' }))
        });
     
}
