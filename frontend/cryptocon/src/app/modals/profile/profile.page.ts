import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ConsultantService, Consultant} from "../../services/consultant.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() consultant: Consultant;
  constructor( private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.consultant);
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }
}
