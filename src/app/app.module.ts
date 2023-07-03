import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { registerVehiclesService } from './services/register-vehicles.service';
import { vehicleFeeService } from './services/vehicles-fee.service';
import { parkingRevenueService } from './services/parking-revenue.service';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './Modules/register-form/register-form.component';
import { RegisterInfoComponent } from './Modules/vehicles-info/register-info/register-info.component';
import { VehiclesStaticsComponent } from './Modules/vehicles-statics/vehicles-statics.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    RegisterInfoComponent,
    VehiclesStaticsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule,
  ],
  providers: [
    registerVehiclesService,
    vehicleFeeService,
    parkingRevenueService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
