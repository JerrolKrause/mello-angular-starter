import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie';

import { AuthService, LoggingService } from 'app-shared';

@Component({
  selector: 'login', 
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public formMain: FormGroup;
    public waiting: boolean;
    public errorApi: IErrorApi;
    public errorLogin: boolean;
    public showPassword: boolean = false;
    public returnUrl: string;
    private cookie: any;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private loggingService: LoggingService,
        private cookies: CookieService
    ) {
    }

    public ngOnInit() {

        // Get the site cookie and if a username is present, set the default value of the login form to that
        this.cookie = this.cookies.getObject('loanDepotApp') || {};
        let hasLogin, isLogin;
        if (this.cookie.username){
            hasLogin = true;
            isLogin = this.cookie.username;
        }
        
        //If a token is set, do not allow users to hit the login page and route them to the index page
        if (window.sessionStorage.token){
            this.router.navigate(['/']);
        }
        
        this.formMain = this.fb.group({ // <-- the parent FormGroup
            email: [isLogin, [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            remember: [hasLogin]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    /**
    * Submit the form
    */
    public onLogin() {
        this.waiting = true;
        this.errorApi = null;
        this.errorLogin = false;

        // If the remember checkbox was checked
        if (this.formMain.value.remember) {
            this.cookie.username = this.formMain.value.email; // Store the username
        } else {
            delete this.cookie.username; // Delete the username
        }
        this.cookies.putObject('loanDepotApp', this.cookie); // Store the cookie

        this.authService.logIn(this.formMain.value).subscribe(
            (success) => {
                // If the API response returns 200 but the login is invalid
                if (success.status == 401 || success.status == 403) {
                    this.errorLogin = true;
                }
                // Valid Login
                else {
                    this.loggingService.identify(this.formMain.value.email); // Identify user to mixpanel
                    this.loggingService.trackEvent('User Logged In');
                    this.router.navigate([this.returnUrl]);
                }
            },
            (error) => {
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
