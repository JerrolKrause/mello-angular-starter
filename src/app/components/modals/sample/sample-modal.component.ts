import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AppState } from 'app-shared';

@Component({
    selector: 'sample-modal-document',
    templateUrl: './sample-modal.component.html'
})
export class SampleModalComponent implements OnInit {

    private ngUnsubscribe: Subject<void> = new Subject<void>(); // Holds observables to unsub from
    public waiting: boolean = false;
    public error: IErrorApi;
    public data: any; // Data is actually passed through the modal service not here

    public user: any = {};

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private appState: AppState
    ) { }

    ngOnInit() {
    }
    
    /**
     * Submit the form
     */
    submit() {

        this.waiting = true;
        this.error = null;

        this.appState.postMockUser(this.user)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                success => this.activeModal.close(success.json()), // On Success, fire the onSuccess method passed to the button modal and pass the api response
                error => { error.errorMsg = 'Error getting users'; this.error = error; }, // On error, show error message
                () => this.waiting = false // On complete, end loading
            )
    }//end submit

    public ngOnDestroy() {
        // Cancel/Unsub from all observables when this component is destroyed
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    
}
