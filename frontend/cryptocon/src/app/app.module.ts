import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {UserService} from './services/user.service';
import {HomePageModule} from './home/home.module';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {QuestionsService} from "./services/questions.service";
import {CategoriesService} from "./services/categories.service";
import {ConsultantService} from "./services/consultant.service";
import {BookPageModule} from "./book/book.module";
import {ConsultantsPage} from "./pages/consultants/consultants.page";
import {ConsultantsPageModule} from "./pages/consultants/consultants.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, HomePageModule,
    BookPageModule,
    ConsultantsPageModule],
  providers: [UserService, QuestionsService, CategoriesService, ConsultantService, {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
