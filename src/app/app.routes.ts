import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';
import { LayoutMainComponent, HomeComponent, NoContentComponent, ScaffoldingComponent } from 'app-containers';

const titleSlug: string = ' | Angular Seed Complete'; // Append to page title

export const ROUTES: Routes = [
    {
        path: '', component: LayoutMainComponent,
        children: [
            { path: '', component: HomeComponent, data: { title: 'Home' + titleSlug }},
            { path: 'scaffolding', component: ScaffoldingComponent, data: { title: 'Scaffolding' + titleSlug } },
            { path: '**', component: NoContentComponent, data: { title: 'Page Not Found' + titleSlug } },
        ]
    }
];