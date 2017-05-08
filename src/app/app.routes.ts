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

const titleSlug: string = ' | Angular Seed Complete'; // Append to page title

export const ROUTES: Routes = [
    // Routes without masterpage need to go first
    { path: 'login', component: LoginComponent, data: { title: 'Please Log In' + titleSlug } },

    // Routes that use masterpage go here
    {
        path: '', component: LayoutMainComponent,
        children: [
            { path: '', component: HomeComponent, data: { title: 'Home' + titleSlug } },
            
            { path: 'scaffolding', component: ScaffoldingComponent, data: { title: 'Scaffolding' + titleSlug } },
            { path: '**', component: NoContentComponent, data: { title: 'Page Not Found' + titleSlug } },
        ]
    },
    
];