import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription  } from "rxjs/Rx"
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'logout-modal',
    templateUrl: './logout-modal.component.html'
})
export class LogoutModalComponent implements OnInit {

    public logoutTimer$: Subscription; // Holds the countdown obserable 
    public counter: number = 120; // Log out after this many seconds

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
        // Create a timer obserable that counts down
        this.logoutTimer$ = Observable.interval(1000).subscribe(res => {
            // If timer is greater than 0, count down.
            if (this.counter > 1) {
                this.counter--;
            }
            // If timer hits zero or below, CLOSE this modal which toggles the logout action in AuthService
            else {
                this.activeModal.close();
            }
        });
    }

    public ngOnDestroy() {
        this.logoutTimer$.unsubscribe(); //Unsub from timer on modal close
    }
    
}
