import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Parkingrevenue,
  parkingRevenueBaseValue,
} from '../Modules/interfaces/parkingrevenue';

@Injectable()
export class parkingRevenueService {
  private vehiclesStatics = new BehaviorSubject(
    JSON.parse(localStorage.getItem('vehiclesStatics')!) ||
      parkingRevenueBaseValue
  );

  currVehicleStatics = this.vehiclesStatics.asObservable();

  updateVehicleStatics(newStatics: Parkingrevenue) {
    this.vehiclesStatics.next(newStatics);
    localStorage.setItem('vehiclesStatics', JSON.stringify(newStatics));
  }
}
