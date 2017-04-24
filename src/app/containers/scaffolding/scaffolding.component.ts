import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppState } from 'app-shared';

@Component({
  selector: 'scaffolding',  // <scaffolding></scaffolding>
  templateUrl: './scaffolding.component.html'
})
export class ScaffoldingComponent implements OnInit {

    public users: any = [];
    public error: boolean;
    
    constructor(
        private appState: AppState,
        private title: Title
    ) {
    }

    public ngOnInit() {
        this.title.setTitle('Scaffolding');
        //API call with subscribe
        this.appState.getMockUsers().subscribe(
            res => {
                this.users = res;
            },
            res => {
                this.error = true;
            }
        );
    }


    /**
     * 
     */
    public doCoolStuff($event) {
        console.log('Doing cool stuff!');
    }

}
