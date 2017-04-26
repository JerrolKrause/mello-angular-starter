import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

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
