import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, StoreMainActions, StoreMainActionsBase, State } from 'app-shared';


@Injectable()
export class StoreMainEffects {
    
    constructor(
        private action$: Actions,
        private appState: AppState,
        private store: Store<State.global>,
        private storeMainActions: StoreMainActions
    )
    {
    }

    //Get mock data from the API and update the store
    @Effect() getUsers = this.action$
        .ofType(this.storeMainActions.actions.USERS_LOAD) // 
        .map(toPayload)
        .switchMap(payload => {
            return this.appState.getMockUsers() // Call to service
                .map(result => ({ type: this.storeMainActions.actions.USERS_LOADED, payload: result }))
                .catch(() => Observable.of({ type: this.storeMainActions.actions.ERRORS, payload: 'USERS_LOAD' })) //TODO: Pass in server error message as part of response
        });
    
    //Post data to the API
    @Effect() postUser = this.action$
        .ofType(this.storeMainActions.actions.USERS_ADD) //
        .map(toPayload)
        .switchMap(payload => {
            return this.appState.postMockUser(payload).delay(2000) // Call to service
                .map(result => ({ type: this.storeMainActions.actions.USERS_ADDED, payload: result.json() }))
                .catch(() => Observable.of({ type: this.storeMainActions.actions.ERRORS, payload: 'USERS_ADD' }))
        });


    /*
    @Effect({ dispatch: false }) apiInteraction = this.action$
        .ofType(StoreEspActions.API_INTERACTION) // Intercept this action
        .withLatestFrom(this.store.select(state => state.espStore)) // Get the latest state from the store
        .map(([action, storeState]) => [action.payload, storeState]) // Map back to named properties
        .concatMap(([payload, storeState]) => {
            //console.warn('1', payload, storeState);
            // Make sure that this payload ID isn't currently in progress or has an error
            if ((!storeState.api.waiting[payload.id] && !storeState.api.errors[payload.id])) {
                // Get the type of content requested in the store
                //return payload.storeData.mergeMap(storeContent => {
                //console.warn('2', storeContent);
                // If the content is not present or the payload refresh is requested
                //if (!storeContent || payload.refresh) {
                //console.warn('3');
                this.store.dispatch({ type: StoreEspActions.WAITING, payload: payload.id });// Set waiting state
                return payload.method(payload.methodData)// Execute the method supplied by the dispatch
                    .map(result => {
                        //console.warn('4', result);
                        this.store.dispatch({ type: StoreEspActions.SUCCESS, payload: payload.id }); // Set success state
                        this.store.dispatch({ type: payload.action, payload: result }); // Return the payload from the method to the reducer with the action specified
                    })
                    // If error, pass that to the reducer
                    .catch(error => this.store.dispatch({ type: StoreEspActions.ERRORS, payload: { id: payload.id, response: error.json() } }));
                //}
                //})
            }

        });
    */

    /*
    //Get mock data from the API and update the store
    @Effect() getUsers2 = this.action$
        .ofType(this.storeMainActions.actions.TEST) // 
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
     */
}
