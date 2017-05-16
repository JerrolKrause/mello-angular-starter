import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import 'rxjs/add/operator/map';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';

import { HttpClient } from 'app-shared';
import { LogoutModalComponent } from 'app-components';

@Injectable()
export class AuthService{

    public modalDuration: number = 120; // 120 How long to show the modal window
    public sessionTimer: any = null; // Holds the logout session timer

    constructor(
        private http: HttpClient,
        private modalService: NgbModal,
        private router: Router
    ) {
    }

    /**
     * Log the user in
     * @param data
     */
    public logIn(data): Observable<Response> {
        let url = this.http.webApiUrl + 'api/Service/login';
        //return this.http.post(url, data);
        
        // Mock login
        url = this.http.webApiUrl + 'assets/mock-data/login.json';
        return this.http.get(url).map(response => {
            window.sessionStorage.token = response.json().Token;
            this.setTimer(response.json().ExpirationSeconds);
            return response;
        });

    }// end LogIn

    /**
     * Refresh the token
     */
    public refreshToken():void {
        
        let url = this.http.webApiUrl + 'api/Service/refreshToken';
        
        // If a token is present, refresh it
        if (window.sessionStorage.token) {
            // Mock login
            url = this.http.webApiUrl + 'assets/mock-data/refreshtoken.json';
            this.http.get(url).subscribe(response => {
                // console.log('Refreshing Token');
                window.sessionStorage.token = response.json().Token;
                this.setTimer(response.json().ExpirationSeconds);
                return response;
            });
        }

        /*
        return this.http.put(url, null, <any>{ headers: { 'Authorization':'Bearer ' + window.sessionStorage.token } }).subscribe(
            (response: any) => {
                //Make sure a token is present before it is replaced
                if (window.sessionStorage.token) {
                    console.log('Refreshing token');
                    window.sessionStorage.token = response.data.Token;
                    this.setTimer(response.data.ExpirationSeconds);
                }
                return response;
            },
            (response: any) => {
                console.log('Error refreshing token');
                this.logOut();
            }
        )
        */
    } // end RefreshToken

    /**
     * Set a countdown timer that pops a modal window when the user is close to session timeout
     * @param ExpirationSeconds
     */
    private setTimer(ExpirationSeconds: number): void {
        // console.log('Setting session timer to ', ExpirationSeconds, ' seconds');
        clearTimeout(this.sessionTimer);
        // ExpirationSeconds = 20;
        this.sessionTimer = setTimeout(() => {
            // console.log('Timer Expired');
            this.launchLogoutModal();
        }, (ExpirationSeconds - this.modalDuration) * 1000);
    } // end SetTimer

    /**
     * Launch a modal window which gives the user a chance to continue working
     */
    private launchLogoutModal(): void {
        // console.log('launchLogoutModal');
        clearTimeout(this.sessionTimer);
        let modalRef = this.modalService.open(LogoutModalComponent, <any>{ size: 'md' });
        modalRef.componentInstance.modalDuration = this.modalDuration; // Pass duration to timeout modal

        // When the modal is closed via log out button
        modalRef.result.then((closeReason) => {
            this.logOut();
        },
        // When modal is dismissed
        (dismissReason) => {
            this.refreshToken();
        });
    } // end launchLogoutModal

    /**
     * Log the user out. Clear stored data and redirect to login page
     */
    public logOut(): void {
        // console.log('Logging Out');
        clearTimeout(this.sessionTimer);
        window.sessionStorage.clear();
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    } // end LogOut

}