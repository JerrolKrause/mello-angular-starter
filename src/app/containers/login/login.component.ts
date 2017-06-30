import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreMainActions, State } from "app-shared";
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

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private loggingService: LoggingService,
        private store: Store<State.global>
    ) {
    }

    public ngOnInit() {

        let isLogin, hasLogin;
        if (window.localStorage.userName) {
            hasLogin = true;
            isLogin = window.localStorage.userName;
        }
        
        //If a token is set, do not allow users to hit the login page and route them to the index page
        if (window.sessionStorage.token) {
            //this.router.navigate(['/']); // 2DO: Breaks automated testing, not essential but would be nice
        }

        window.clearTimeout(this.authService.sessionTimer); // When the page is loaded, clear any legacy timeouts
        this.authService.logOutModal = null; // Get rid of logout modal if it persists

        this.formMain = this.fb.group({ // <-- the parent FormGroup
            userName: [isLogin || 'someUser', [Validators.required]],
            password: ['123456', [Validators.required]],
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
            window.localStorage.userName = this.formMain.value.userName; // Store the username
        } else {
            delete window.localStorage.userName; // Delete the username
        }

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
