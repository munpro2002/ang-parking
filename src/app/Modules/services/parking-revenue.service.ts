import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Parkingrevenue,
  STATICS_BASE_VALUE,
} from '../interfaces/parkingrevenue';

@Injectable()
export class parkingRevenueService {
  private vehiclesStatics = new BehaviorSubject(
    JSON.parse(localStorage.getItem('vehiclesStatics')!) || STATICS_BASE_VALUE
  );

  currVehicleStatics = this.vehiclesStatics.asObservable();

  updateVehicleStatics(newStatics: Parkingrevenue) {
    this.vehiclesStatics.next(newStatics);
    localStorage.setItem('vehiclesStatics', JSON.stringify(newStatics));
  }
}
