import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login', 
  //styleUrls: [ './dashboard.component.css' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

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
