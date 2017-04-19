import { Component, OnInit } from '@angular/core';
import { AppState } from 'app-shared';

@Component({
  selector: 'scaffolding',  // <scaffolding></scaffolding>
  templateUrl: './scaffolding.component.html'
})
export class ScaffoldingComponent implements OnInit {

    public users: any;
    public users2: any;

    constructor(
        private appState: AppState
    ) {
        this.users2 = this.appState.getMockUsers(); //API call with Async Pipe
    }

    public ngOnInit() {
        //API call with subscribe
        this.appState.getMockUsers().subscribe(res => {
            this.users = res;
        });
  }

}
