import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatWeDoPage } from './what-we-do.page';

const routes: Routes = [
  {
    path: '',
    component: WhatWeDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatWeDoPageRoutingModule {}
