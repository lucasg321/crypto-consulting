import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import { ModalController } from '@ionic/angular';
import {WhatWeDoPage} from "../modals/what-we-do/what-we-do.page";
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logged_in = localStorage.getItem("access_token");
  username = localStorage.getItem("email");

  dataReturned: any;
  constructor(public userService: UserService, public modalController: ModalController, private routerOutlet: IonRouterOutlet) {
  }
  logout() {
    this.userService.logout();
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: WhatWeDoPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'border-radius-50'
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
