import { Routes } from '@angular/router';

export const routes: Routes = [
{path:'dashboard',loadComponent:()=>import('./Dashboard-Administration/dashboard/dashboard.component')},

{path:'login',loadComponent:()=>import('./Authenticate/login/login.component')},
{path:'**',
  redirectTo:'login'
},

];
