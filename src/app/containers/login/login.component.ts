import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { AuthService } from 'app-shared';

@Component({
  selector: 'login', 
  //styleUrls: [ './dashboard.component.css' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public formMain: any = {};
    public waiting: boolean;
    public errorApi: IErrorApi;
    public errorLogin: boolean;
    public showPassword: boolean = false;

    public returnUrl: string;


    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit() {

        //If a token is set, do not allow users to hit the login page and route them to the index page
        if (window.sessionStorage.token){
            this.router.navigate(['/']);
        }
        
        this.formMain = this.fb.group({ // <-- the parent FormGroup
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    /**
    * Submit the form
    */
    public onLogin() {
        console.log('Submitting Form', this.formMain.value);
        this.waiting = true;
        this.errorApi = null;
        this.errorLogin = false;

        this.authService.logIn(this.formMain.value).subscribe(
            (success) => {
                console.log(success, success.json());
                // If the API response returns 200 but the login is invalid
                if (success.status == 401 || success.status == 403) {
                    this.errorLogin = true;
                }
                // Valid Login
                else {
                    this.router.navigate([this.returnUrl]);
                }

            },
            (error) => {
                console.log(error);
                this.errorLogin = true;
                //error.errorMsg = 'Error logging in'
                //this.errorApi = error; 
            }, 
            () => {
                this.waiting = false;
                this.errorApi = null;
                this.errorLogin = false;
            }
        )

    } // end onSubmit

}
