import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'field-component',
    templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit {

    @Input() frmGroup: any;
    @Input() frmControl: string; // Object property of reactive form
    @Input() label: string; // Label for the user to read
    @Input() type: string = 'text'; // The type of the input box
    @Input() placeholder?: string = ''; // Placeholder property
    @Input() disabled: boolean = false; // Placeholder property
    @Input() model?: object; // Model data for a select box
    @Input() modelLabel?: string; // If a model is supplied, this is the object property of the label for the user to read

    public field: any; // Hold a reference to the current field element, this is set in ngoninit
    public showPwd: boolean = false;

    //@Output() onSuccess: EventEmitter<any> = new EventEmitter(); // A method to emit events to pass up to parent
    //this.onSuccess.emit(closeReason);

    constructor(
    ) {
    }

    ngOnInit() {
        this.field = this.frmGroup.get(this.frmControl); //Set a reference to this field for simplicity
    }

    checkboxMap($event) {
        console.log('Changing', $event, this.model);
    }

}