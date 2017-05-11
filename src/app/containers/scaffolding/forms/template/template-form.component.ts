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
       
    }


    public register() {
      
    }

    /**
     * 
     */
    public onSubmit() {
        this.loggingService.identify('eat@joes.com');
    }

}
