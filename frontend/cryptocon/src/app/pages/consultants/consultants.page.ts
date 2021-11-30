import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {PaymentPage} from "../../modals/payment/payment.page";
import {ProfilePage} from "../../modals/profile/profile.page";
import {ConsultantService, Consultant} from "../../services/consultant.service";
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionsService} from "../../services/questions.service";
import {CategoriesService, Category} from "../../services/categories.service";


@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.page.html',
  styleUrls: ['./consultants.page.scss'],
})
export class ConsultantsPage implements OnInit {
  dataReturned: any;
  consultants?: Consultant[];
  categories?: Category[];
  public env: any;

  constructor(public modalController: ModalController,
              private routerOutlet: IonRouterOutlet,
              private consultantService: ConsultantService,
              private questionService: QuestionsService,
              private route: ActivatedRoute,
              private categoriesService: CategoriesService) {
    this.env = environment;
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    if (id){
      console.log("id");
      this.getConsultants(id);
    }
    else {
      this.getConsultants();
    }
    this.getCategories();
  }

  async openModalBook() {
    const modal = await this.modalController.create({
      component: PaymentPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      },
      swipeToClose: true,
      backdropDismiss: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'border-radius-50 booking-modal'
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  async openModalProfile(consultant) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        "consultant": consultant,

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

  getConsultants(id: number = 0) {
    if (id !== 0) {
      this.questionService.get(id).subscribe(
        // the first argument is a function which runs on success
        data => {
          this.consultants = data[0].consultants;
        },
        // the second argument is a function which runs on error
        error => console.error(error),
        // the third argument is a function which runs on completion
        () => console.log('done loading consultants')
      );
    }
    else{
      this.consultantService.list().subscribe(
        // the first argument is a function which runs on success
        data => {
          this.consultants = data;
        },
        // the second argument is a function which runs on error
        error => console.error(error),
        // the third argument is a function which runs on completion
        () => console.log('done loading consultants')
      );
    }
  }
  getCategories(){
    this.categoriesService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.categories = data;
        console.log(data);
      },
      // the second argument is a function which runs on error
      error => console.error(error),
      // the third argument is a function which runs on completion
      () => console.log('done loading consultants')
    );
  }
}
