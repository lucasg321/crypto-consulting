import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatWeDoPageRoutingModule } from './what-we-do-routing.module';

import { WhatWeDoPage } from './what-we-do.page';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatWeDoPageRoutingModule,
    SwiperModule
  ],
  declarations: [WhatWeDoPage]
})
export class WhatWeDoPageModule {}
