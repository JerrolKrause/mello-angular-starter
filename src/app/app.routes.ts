import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';
import {
    LayoutMainComponent,
    LayoutSingleComponent,
    HomeComponent,
    NoContentComponent,
    ScaffoldingComponent,
    LoginComponent
} from 'app-containers';

import { AuthGuard } from 'app-shared';


const titleSlug: string = ' | Angular Seed Complete'; // Append to page title

export const ROUTES: Routes = [
    // Routes without masterpage or that do not need to be authenticated need to go first
    { path: 'login', component: LoginComponent, data: { title: 'Please Log In' + titleSlug } },

    // Routes that use masterpage go here
    // canActivate with AuthGuard determines if this is an authenticated only route
    {
        path: '', component: LayoutMainComponent,
        children: [
            { path: '', component: HomeComponent, data: { title: 'Home' + titleSlug }, canActivate: [AuthGuard], },
            { path: 'scaffolding', component: ScaffoldingComponent, data: { title: 'Scaffolding' + titleSlug }, canActivate: [AuthGuard], },
            { path: '**', component: NoContentComponent, data: { title: 'Page Not Found' + titleSlug }, canActivate: [AuthGuard], },
        ]
    },
];