import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'app-shared';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'rest-api',  // <scaffolding></scaffolding>
  templateUrl: './rest-api.component.html'
})
export class RestApiComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>(); // Holds observables to unsub from
    public users: any = [];
    public usersWaiting: boolean = true;
    public usersError: IErrorApi;

    constructor(
        private appState: AppState
    ) {
    }

    public ngOnInit() {
        this.appState.getMockUsers()
            .takeUntil(this.ngUnsubscribe) // Register for easy un-sub
            .subscribe(
            users => {this.users = users; }, // Get users
                error => { error.errorMsg = 'Error getting users.'; console.log(error); this.usersError = error; }, // Errors
                () => this.usersWaiting = false // End loading
            );
    }
    
    /**
     * Callback function for a successful modal close event. In this instance, adds the API response to the users array. This method is passed to the button modal component
     */
    public doCoolStuff(user:any) {
        this.users.unshift(user); // Add new user to users array
    }// end doCoolStuff

    public ngOnDestroy() {
        // Cancel/Unsub from all observables when this component is destroyed
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
