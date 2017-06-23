import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit{

    public formMain: FormGroup ;
    public states = ['CA', 'MD', 'OH', 'VA'];
    public colors = ['Black', 'White', 'Red', 'Blue', 'Yellow'];
    public pets = ['Dogs', 'Cats', 'Man Eating Tigers'];
    
    public daysModel = [
        { id: "sunday", name: "Sunday"},
        { id: "monday", name: "Monday" },
        { id: "tuesday", name: "Tuesday" },
        { id: "wednesday", name: "Wednesday" },
        { id: "thursday", name: "Thursday" },
        { id: "friday", name: "Friday" },
        { id: "saturday", name: "Saturday" },
    ];

    constructor(
        private fb: FormBuilder
    ) {
    }

    public ngOnInit(): void {

        /**
        //create daysFormGroup using FormGroup long-hand syntax
        //this is so I can create a dynamic form from the array of IDay objects
        let daysFormGroup: FormGroup = new FormGroup({});
        for (let day of this.days) {
            let control: FormControl = new FormControl(day.value, Validators.required);
            daysFormGroup.addControl(day.value, control);
        }
       */

        this.formMain = this.fb.group({ // <-- the parent FormGroup
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            address: this.fb.group({ // <-- the child FormGroup
                street: [''],
                street2: new FormControl({ value: 'Test', disabled: true },[ Validators.required, Validators.minLength(5)]), // Adding disabled makes control ignore validators
                city: ['', [Validators.required, Validators.maxLength(50)]],
                state: ['', [Validators.required]], 
                zip: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]{5}')]], // Sample validation with regex pattern
                currency: ['50000', [Validators.required]] // Sample validation with regex pattern
            }),
            date: ['', [Validators.required]],
            message: [''],
            colors: [this.colors[1]], //Set the default to the second item in the array
            days: this.fb.group({
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            })
        });

        // Reset form
        //this.formMain.reset();

        // Set value replaces assigns a value to every field. Every field is required
        //this.formMain.setValue({
        //    name: this.hero.name,
        //    address: this.hero.addresses[0] || new Address()
        //});

        // Patch value assigns a value to the form control
        this.formMain.patchValue({
            name: 'Jerrol Krause'
        });

        //console.log(this.formMain.get('name').value);
    }


    /**
     * On form submit
     */
    public onSubmit() {
        console.log(this.formMain);

        // Sample code for how to map an array of objects down to a array of strings
        let newArray = []
        Object.keys(this.formMain.value.days).map((objectKey, index) => {
            let value = this.formMain.value.days[objectKey];
            if (value){
                newArray.push(objectKey)
            }
            return objectKey;
        });
        this.formMain.value.days = newArray;


        if (this.formMain.invalid) {
            //console.log('Form is invalid', Object.keys(this.formMain.controls));

            // A simple closure that loops through the form object and sets everything to dirty and touched
            // This activates the validation logic for every form field to show if a field is valid or invalid
            let showErrors = (form) => {
                Object.keys(form).map((objectKey, index) => {
                    let value = form[objectKey];
                    if (value.controls) { // If this is a nested form group, recurse
                        showErrors(value.controls);
                    } else { // Not a form group, mark as dirty and touched
                        value.markAsDirty();
                        value.markAsTouched();
                    }
                });
            }

            showErrors(this.formMain.controls);
        } else {
            // console.log('Valid ', this.formMain.value)

           

        }

    }

}
