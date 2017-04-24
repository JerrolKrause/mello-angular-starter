import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(
        private title: Title
    ) {
    }

    public ngOnInit() {
        this.title.setTitle('Angular Seed Complete');
    }

}
