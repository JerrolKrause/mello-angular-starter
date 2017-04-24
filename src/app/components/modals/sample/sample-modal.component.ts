import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sample-modal-document',
    templateUrl: './sample-modal.component.html'
})
export class SampleModalComponent implements OnInit {

    public inProgress: boolean = false;
    public data: any; // Data is actually passed through the modal service not here
    
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
    }
    
    /**
     * Submit the form
     */
    submit() {
        //Fire the onSuccess method passed to the button modal
        this.activeModal.close('Submit Successful')
    }//end submit
    
}
