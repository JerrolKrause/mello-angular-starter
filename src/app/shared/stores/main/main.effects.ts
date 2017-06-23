import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StoreMainActions } from "app-shared";
import { Store } from '@ngrx/store';
import { AppState } from 'app-shared';


@Injectable()
export class StoreMainEffects {

    

    constructor(
        private action$: Actions,
        private appState: AppState,
        private store: Store<any>
    )
    { }

    test() {
        return Observable.concat(this.store.select(state => state), this.store.select(state => state.WAITING));
    }

    //Get mock data from the API and update the store
    @Effect() getUsers = this.action$
        .ofType(StoreMainActions.USERS_LOAD) // 
        .map(toPayload)
        .switchMap(payload => {
            return this.appState.getMockUsers() // Call to service
                .map(result => ({ type: StoreMainActions.USERS_LOADED, payload: result }))
                .catch(() => Observable.of({ type: StoreMainActions.ERRORS, payload: 'USERS_LOAD' })) //TODO: Pass in server error message as part of response
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


    //Get mock data from the API and update the store
    @Effect() getUsers2 = this.action$
        .ofType(StoreMainActions.TEST) // 
        .map(toPayload)
        .map(res => {
            //res.new = Observable.of('test').withLatestFrom(this.store.select(state => state));
            return this.store.select(state => state)
            //return Observable.of(res).withLatestFrom(this.store.select(state => state));
            //return res;
        })
        .withLatestFrom(this.store.select(state => state))
        .switchMap(payload => {
            console.warn('payload', payload);
            return Observable.of('Test');
        });
     
}
