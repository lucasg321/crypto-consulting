import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultantsPageRoutingModule } from './consultants-routing.module';

import { ConsultantsPage } from './consultants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultantsPageRoutingModule
  ],
  declarations: [ConsultantsPage]
})
export class ConsultantsPageModule {}
