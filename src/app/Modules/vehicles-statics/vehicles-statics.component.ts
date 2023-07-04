import { Component, OnInit } from '@angular/core';
import { parkingRevenueService } from 'src/app/services/parking-revenue.service';
import {
  Parkingrevenue,
  parkingRevenueBaseValue,
} from '../interfaces/parkingrevenue';

@Component({
  selector: 'app-vehicles-statics',
  templateUrl: './vehicles-statics.component.html',
  styleUrls: ['./vehicles-statics.component.scss'],
})
export class VehiclesStaticsComponent implements OnInit {
  dataStatics: Parkingrevenue = parkingRevenueBaseValue;

  constructor(private parkingService: parkingRevenueService) {}

  ngOnInit() {
    this.parkingService.currVehicleStatics.subscribe(
      (statics: Parkingrevenue) => (this.dataStatics = statics)
    );
  }

  clearStaticsHandler() {
    this.parkingService.updateVehicleStatics(parkingRevenueBaseValue);
  }
}
