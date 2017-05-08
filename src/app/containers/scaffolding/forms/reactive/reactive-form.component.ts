import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'reactive-form',  // <scaffolding></scaffolding>
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit{

    public formMain: any = {};
    public states = ['CA', 'MD', 'OH', 'VA'];
    public colors = ['Black', 'White', 'Red', 'Blue', 'Yellow'];
    public pets = ['Dogs', 'Cats', 'Man Eating Tigers'];

    constructor(
        private fb: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        

        this.formMain = this.fb.group({ // <-- the parent FormGroup
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            address: this.fb.group({ // <-- the child FormGroup
                street: [''],
                city: ['', [Validators.required, Validators.maxLength(50)]],
                state: ['', [Validators.required]],
                zip: ['', [Validators.required, Validators.minLength(5),Validators.pattern('[0-9]{5}')]] // Sample validation with regex pattern
            }),
            message: [''],
            colors: [''],
            pets: ['']
            //pets: this.fb.array([])
        });

        // Reset form
        this.formMain.reset();

        // Set value replaces assigns a value to every field. Every field is required
        //this.heroForm.setValue({
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

        if (this.formMain.invalid) {
            console.log('Form is invalid', Object.keys(this.formMain.controls));

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
            console.log('Valid ', this.formMain.value)
        }

    }

}
