import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Check if a token is in session storage, if so user is authenticated
        if (window.sessionStorage.getItem('token')) {
            return true;// logged in so return true
        }

        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}