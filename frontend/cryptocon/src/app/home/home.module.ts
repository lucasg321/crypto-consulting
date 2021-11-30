import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {WhatWeDoPageModule} from "../modals/what-we-do/what-we-do.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    WhatWeDoPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor() {

  }

}
