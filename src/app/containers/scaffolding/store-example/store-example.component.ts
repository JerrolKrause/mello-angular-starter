import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMainActions } from "app-shared";


@Component({
  selector: 'store-example',
  templateUrl: './store-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreExampleComponent implements OnInit {

    storeMain$: any;
    user: string;

    constructor(
        private store: Store<any>
    ) {
        this.storeMain$ = this.store.select('StoreMainReducer');// Sub to store
    }

    public ngOnInit() {
        //Reset state on every load
        this.store.dispatch({
            type: StoreMainActions.RESET_STATE,
            payload: null
        });
        //Load users into the store
        this.store.dispatch({
            type: StoreMainActions.USERS_LOAD,
            payload: null
        });
    }


    /**
     * Add a user
     */
    addUser() {
        //Set waiting animation
        this.store.dispatch({
            type: StoreMainActions.WAITING,
            payload: StoreMainActions.USERS_ADD
        });

        //Add a user
        this.store.dispatch({
            type: StoreMainActions.USERS_ADD,
            payload: { name: this.user }
        });
    } // end addUser

}
