import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';
import { HomeComponent, NoContentComponent } from 'app-containers';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
