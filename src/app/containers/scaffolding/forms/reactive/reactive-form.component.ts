import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'reactive-form',  // <scaffolding></scaffolding>
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit{

    public form: any = {};
    public showPassword: boolean = false;
    
    constructor(
    ) {
    }

    public ngOnInit() {
     
    }


    /**
     * 
     */
    public onSubmit() {
        console.log('Submitting Form', this.form);
    }

}
