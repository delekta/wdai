import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { FormsModule } from "@angular/forms";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppComponent } from './app.component';
import { HolidaysOfferComponent } from './holidays-offer/holidays-offer.component';
import { HolidaysOfferElementComponent } from './holidays-offer-element/holidays-offer-element.component';
import { FormComponent } from './form/form.component';
import { FiltersComponent } from './filters/filters.component';
import { TrolleyComponent } from './trolley/trolley.component';
import { StarsComponent } from './stars/stars.component';
import { CommonModule } from '@angular/common';
import { FilterLocationPipe } from './pipes/filter-location.pipe';
import { FilterRatingPipe } from './pipes/filter-rating.pipe';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { FilterDatePipe } from './pipes/filter-date.pipe';
import { SliderComponent } from './slider/slider.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule} from '@angular/fire/database';






@NgModule({
  declarations: [
    AppComponent,
    HolidaysOfferComponent,
    HolidaysOfferElementComponent,
    FormComponent,
    FiltersComponent,
    TrolleyComponent,
    StarsComponent,
    FilterLocationPipe,
    FilterRatingPipe,
    FilterPricePipe,
    FilterDatePipe,
    SliderComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxSliderModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  exports: [
    SliderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
