import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { registerVehiclesService } from './Modules/services/register-vehicles.service';
import { vehicleFeeService } from './Modules/services/vehicles-fee.service';
import { parkingRevenueService } from './Modules/services/parking-revenue.service';

import { FilterPipe } from './Modules/pipes/filter.pipe';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './Modules/components/register-form/register-form.component';
import { RegisterInfoComponent } from './Modules/components/register-info/register-info.component';
import { VehiclesStaticsComponent } from './Modules/components/vehicles-statics/vehicles-statics.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    RegisterInfoComponent,
    VehiclesStaticsComponent,
    FilterPipe,
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
