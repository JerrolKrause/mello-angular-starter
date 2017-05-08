import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'input-component',
    templateUrl:'./input.component.html'
})
export class InputComponent implements OnInit {
   
    @Input() parentFormGroup: any;
    @Input() id: string; // Object property of reactive form
    @Input() label: string; // Label for the user to read
    @Input() type: string = 'text'; // The type of the input box
    @Input() model: object; // Model data for a select box

    //@Output() onSuccess: EventEmitter<any> = new EventEmitter(); // A method to emit events to pass up to parent
    //this.onSuccess.emit(closeReason);

    constructor(
    ) { }

    ngOnInit() {
        //console.log('Input Comp',this.parentFormGroup)
    }

    test() {
        console.log('test');
    }
}