import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'template-form',  // <scaffolding></scaffolding>
  templateUrl: './template-form.component.html'
})
export class TemplateFormComponent implements OnInit{

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
