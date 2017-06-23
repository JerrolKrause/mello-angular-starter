import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Subscription } from "rxjs";

//TODO: Refactor currency and date fields to subcomponents

@Component({
    selector: 'field-component',
    templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit {

    @Input() frmGroup: FormGroup;
    @Input() frmControl: string; // Object property of reactive form
    @Input() label: string; // Label for the user to read
    @Input() type: string = 'text'; // The type of field, default is text
    @Input() placeholder: string = ''; // Placeholder property
    @Input() classes: string = ''; // Placeholder property
    @Input() disabled: boolean = false; // Disabled or not
    @Input() model?: object; // Model data for a select box
    @Input() modelLabel?: string; // If a model is supplied, this is the label to use
    @Input() modelValue?: string; // If a model is supplied, this is the value of the option to pass back to the form

    public field: AbstractControl; // Hold a reference to the current field element, this is set in ngoninit
    public showPwd: boolean = false; // password toggler for password field
    public altFormat: string | number = ''; // An alternate version of the field data that is formatted differently. IE currency

    private frmGroupSub: Subscription; // If this field elements needs to subscribe to form changes

    constructor(
        private datePipe: DatePipe,
        private currencyPipe: CurrencyPipe
    ) {
    }

    ngOnInit() {
        this.field = this.frmGroup.get(this.frmControl); //Set a reference to this field for simplicity

        // Since the visible currency field is a mask and not connected to the main formgroup, it needs to know when the form model changes
        // This also handles loading the initial value
        if (this.type == 'currency') {
            this.frmGroupSub = this.frmGroup.valueChanges.subscribe(res => {
                if (this.field.value && this.field.value != '') {
                    this.altFormat = this.currencyPipe.transform(this.field.value, 'USD', true, '1.0');
                }
            });
        }
    }

    ngOnDestroy() {
        // Unsub
        if (this.frmGroupSub) {
            this.frmGroupSub.unsubscribe();
        }
    }

    checkboxMap($event) {
        console.log('Changing', $event, this.model);
    }

    /**
     * Format a currency input to be nicely formatted but return a standard number to the form mdoel
     * @param $event - Dom event
     */
    onCurrencyChange($event) {
        let dollars, cents, hasDecimal, newVal,
            amount = $event.target.value.replace(/[^0-9.]/gi, '') || '0';
        // If a decimal is present, split the string so that the currencyPipe will format only the dollar amount not the cents
        if (amount.indexOf('.') != -1) {
            cents = amount.split('.')[1].substring(0, 2);
            hasDecimal = true;
        }
        dollars = amount.split('.')[0];
        newVal = this.currencyPipe.transform(dollars, 'USD', true, '1.0');
        // Rejoin the dollars, decimal and cents
        newVal += hasDecimal ? '.' : '';
        newVal += cents ? cents : '';
        // Update the fiels
        $event.target.value = newVal;
        this.field.setValue(newVal.replace(/[^0-9.]/gi, ''));
    } // end onCurrencyChange

    /**
     * On date change, format it to how that model needs it
     * @param $event - Dom event
     * TODO: Figure out a way to have the user viewable version match the newly formatted version
     */
    onDateChange(altFormat:any) {
        console.warn('Date Change', altFormat);
        let newDate = `${altFormat.month}/${altFormat.day}/${altFormat.year}`; // Reformat the date
        this.field.setValue(newDate); // Set form value to the new format
    } // onDateChange

}