import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,

} from '@ionic/angular';
// import { IonicSlides } from '@ionic/angular';



@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.page.html',
  styleUrls: ['./what-we-do.page.scss'],
})
export class WhatWeDoPage implements OnInit {

  modalTitle: string;
  modelId: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

}
