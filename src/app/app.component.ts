import { Component,  OnInit,  ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

    errorApp: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
    ) {}

    public ngOnInit() {
        // Change the document title on route change. Page titles are in app.routes.ts
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => this.title.setTitle(event['title']));
    }


}
