import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

    public isOpen: boolean = false;

    constructor(
        private router: Router
    ) {
    }

    public ngOnInit() {
        //On route change, close nav window
        this.router.events.subscribe((val) => { 
            this.isOpen = false;
        })
    }

}
