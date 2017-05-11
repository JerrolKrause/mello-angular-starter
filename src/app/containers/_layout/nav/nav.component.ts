import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app-shared';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

    public isOpen: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    public ngOnInit() {
        //On route change, close nav window
        this.router.events.subscribe((val) => { 
            this.isOpen = false;
        })
    }

}
