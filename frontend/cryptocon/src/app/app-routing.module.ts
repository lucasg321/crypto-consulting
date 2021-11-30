import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import {ConsultantsPage} from "./pages/consultants/consultants.page";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'consultants',
    loadChildren: () => import('./pages/consultants/consultants.module').then( m => m.ConsultantsPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:access/:email/:refresh',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'what-we-do',
    loadChildren: () => import('./modals/what-we-do/what-we-do.module').then( m => m.WhatWeDoPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./modals/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'schedule-time',
    loadChildren: () => import('./modals/schedule-time/schedule-time.module').then( m => m.ScheduleTimePageModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then( m => m.BookPageModule),
  },
  {
    path: 'book/:id',
    component: ConsultantsPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./modals/profile/profile.module').then( m => m.ProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){}

  redirect(page) {
    this.router.navigate([page]);
  }
}
