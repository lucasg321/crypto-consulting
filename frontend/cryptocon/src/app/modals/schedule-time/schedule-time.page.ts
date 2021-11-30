import { Component, OnInit } from '@angular/core';
import {ConsultantService, Consultant} from "../../services/consultant.service";
import {ProfilePage} from "../profile/profile.page";
import {IonRouterOutlet, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-schedule-time',
  templateUrl: './schedule-time.page.html',
  styleUrls: ['./schedule-time.page.scss'],
})
export class ScheduleTimePage implements OnInit {
  consultants?: Consultant[];

  constructor(private consultantService: ConsultantService, public modalController: ModalController,  private routerOutlet: IonRouterOutlet,) { }

  ngOnInit() {
    this.getConsultants();
  }
  getConsultants() {
    console.log(this.consultantService.list());
    this.consultantService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.consultants = data;
        console.log(JSON.stringify(this.consultants));
        console.log(this.consultants);
        // console.log(data);

        // for(let key in data){
        //   console.log(key);
        //
        //   console.log(data[key]);
        // }
        // console.log(data);

      },
      // the second argument is a function which runs on error
      error => console.error(error),
      // the third argument is a function which runs on completion
      () => console.log('done loading consultants')
    );
  }
  async openModalProfile(consultant) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        "consultant": consultant
      },
      swipeToClose: true,
      showBackdrop: false,
      backdropDismiss: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'border-radius-50 booking-modal'
    });

    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     this.dataReturned = dataReturned.data;
    //     //alert('Modal Sent Data :'+ dataReturned);
    //   }
    // });

    return await modal.present();
  }
}
