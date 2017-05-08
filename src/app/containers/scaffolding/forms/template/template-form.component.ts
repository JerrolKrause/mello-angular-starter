import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggingService } from 'app-shared';

declare var window: any;

@Component({
  selector: 'template-form',  // <scaffolding></scaffolding>
  templateUrl: './template-form.component.html'
})
export class TemplateFormComponent implements OnInit{

    public form: any = {};
    public showPassword: boolean = false;
    
    constructor(
        private loggingService: LoggingService
    ) {
    }

    public ngOnInit() {
        this.loggingService.trackEvent('Alias Test 8');
    }


    public register() {
        console.log('Registering', this.form);
        this.loggingService.alias(this.form.email);
        this.loggingService.alias(this.form.phone);
        window.mixpanel.people.set({email:this.form.email, phone:this.form.phone});
    }

    /**
     * 
     */
    public onSubmit() {
        console.log('Submitting Form', this.form);
        this.loggingService.identify('eat@joes.com');
    }

}
