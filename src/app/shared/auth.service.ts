import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import 'rxjs/add/operator/map';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';

import { LogoutModalComponent } from 'app-components';

@Injectable()
export class AuthService{
    
    public sessionTimer: any = null; // Holds the logout session timer

    constructor(
        private http: Http,
        private modalService: NgbModal,
        private router: Router
    ) {

    }

    /**
     * Log the user in
     * @param data
     */
    public logIn(data): Observable<any> {
        let url = 'api/Service/login';
        //return this.http.post(url, data);
        
        // Mock login
        url = '/assets/mock-data/login.json';
        return this.http.get(url).map(response => {
            window.sessionStorage.token = response.json().Token;
            this.setTimer(response.json().ExpirationSeconds);
            return response;
        });

    }// end LogIn

    /**
     * Refresh the token
     */
    public refreshToken() {
        console.log('Refreshing Token');
        let url = 'api/Service/refreshToken';
       
        // Mock login
        url = '/assets/mock-data/refreshtoken.json';
        return this.http.get(url, <any>{ headers: { 'Authorization':'Bearer ' + window.sessionStorage.token } }).map(response => {
            if (window.sessionStorage.token) { 
                window.sessionStorage.token = response.json().Token;
                this.setTimer(response.json().ExpirationSeconds);
            }
            return response;
        }).subscribe();


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
        console.log('Setting session timer to ', ExpirationSeconds, ' seconds')
        clearTimeout(this.sessionTimer);
        this.sessionTimer = setTimeout(() => {
            console.log('Timer Expired');
            this.launchLogoutModal();
        }, ExpirationSeconds * 1000);
    } // end SetTimer

    /**
     * Launch a modal window which gives the user a chance to continue working
     */
    private launchLogoutModal():void {
        clearTimeout(this.sessionTimer);
        let modalRef = this.modalService.open(LogoutModalComponent, <any>{ size: 'md' });

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
        console.log('Logging Out');
        clearTimeout(this.sessionTimer);
        window.sessionStorage.clear();
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    } // end LogOut




}