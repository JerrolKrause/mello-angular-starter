import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';
import { LayoutMainComponent, HomeComponent, NoContentComponent, ScaffoldingComponent } from 'app-containers';

export const ROUTES: Routes = [
    {
        path: '', component: LayoutMainComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'scaffolding', component: ScaffoldingComponent },
            { path: '**', component: NoContentComponent },
        ]
    }
];