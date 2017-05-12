import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreMainActions } from "app-shared";
import { Observable } from 'rxjs';

@Component({
  selector: 'ui',
  templateUrl: './ui.component.html',
})
export class UiComponent implements OnInit {

    constructor(
    ) {
    }

    public ngOnInit() {
       
    }

}
