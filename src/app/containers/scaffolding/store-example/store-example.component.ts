import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMainActions } from "app-shared";
import { Observable } from 'rxjs';

@Component({
  selector: 'store-example',
  templateUrl: './store-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreExampleComponent implements OnInit {

    storeMain$: Observable<IStoreMain>;
    user: string;

    constructor(
        private store: Store<IStoreMain>
    ) {
        this.storeMain$ = this.store.select('StoreMainReducer');// Sub to store
    }

    public ngOnInit() {
        // Reset state on every load, don't do this if the store is persistant
        this.store.dispatch({
            type: StoreMainActions.RESET_STATE,
            payload: null
        });
        // Load users into the store
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
