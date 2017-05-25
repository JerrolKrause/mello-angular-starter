import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

// Import any modal content components
import { SampleModalComponent, LogoutModalComponent } from 'app-components';


@Component({
  selector: 'button-modal',
  template: `<button class="{{classes}}" (click)="openModal()">
                <ng-content></ng-content>
            </button>`
})
export class ButtonModalComponent implements OnInit {
    
    @Input() modal: string; // The name of the component modal
    @Input() data: any; // Any model data that needs to be passed to the modal component
    @Input() classes: string = 'btn btn-outline-primary btn-sm'; // CSS classes to apply to the button
    @Input() size: any = 'md'; // Default size of the modal, can be sm/md/lg
    @Output() onSuccess: EventEmitter<any> = new EventEmitter(); // A method to emit events to pass up to parent

    // List all modals with reference here, used for string lookup
    public modalsList = {
        SampleModalComponent: SampleModalComponent,
        LogoutModalComponent: LogoutModalComponent
    }
    
    constructor(
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
    }
    
    /**
    * Open a modal window
    * Attach a success function and pass any relevant data to the modal component
    */
    public openModal() {
        let modalToOpen = this.modalsList[this.modal];

        let options = { size: this.size };

        // Store reference to the modal instance
        let modalRef = this.modalService.open(modalToOpen, options);

        if (this.data){ 
        // Add any passed in data to the modal instance
            modalRef.componentInstance.data = this.data;
        }

        // Wait for promise that is returned when modal is closed or dismissed
        modalRef.result.then((closeReason) => {
            // On modal close (which is the success indicator), emit OnSuccess method
            this.onSuccess.emit(closeReason);
        }, (dismissReason) => {
            // On modal dismiss, which is closed without performing an action
        });
    }//end openModal

}