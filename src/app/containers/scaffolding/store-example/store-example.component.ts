import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMainActions, State } from "app-shared";
import { Observable } from 'rxjs';

@Component({
  selector: 'store-example',
  templateUrl: './store-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreExampleComponent implements OnInit {

    storeMain$: Observable<State.main>;
    user: string;

    constructor(
        private store: Store<State.global>,
        private storeMainActions: StoreMainActions
    ) {
        this.storeMain$ = this.store.select(state => state.main); // Sub via computed property
    }
     //TODO: Pass in server error message as part of response
    public ngOnInit() {
        // Reset state on every load, don't do this if the store is persistant
        this.store.dispatch({
            type: this.storeMainActions.actions.RESET_STATE,
            payload: null
        });
        // Load users into the store
        this.store.dispatch({
            type: this.storeMainActions.actions.USERS_LOAD,
            payload: null
        }); 

        this.storeMain$.subscribe(res => {
            console.warn('Store', res);
        })

    }

    /**
     * Add a user
     */
    addUser() {
        //Set waiting animation
        this.store.dispatch({
            type: this.storeMainActions.actions.WAITING,
            payload: this.storeMainActions.actions.USERS_ADD
        });

        //Add a user
        this.store.dispatch({
            type: this.storeMainActions.actions.USERS_ADD,
            payload: { name: this.user }
        });
    } // end addUser

}
