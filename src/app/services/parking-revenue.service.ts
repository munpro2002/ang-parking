import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class parkingRevenueService {
  private vehiclesStatics = new BehaviorSubject(
    JSON.parse(localStorage.getItem('vehiclesStatics')!) || {
      fseated: {
        in: 0,
        out: 0,
        revenue: 0,
      },
      sseated: {
        in: 0,
        out: 0,
        revenue: 0,
      },
      truck: {
        in: 0,
        out: 0,
        revenue: 0,
      },
    }
  );

  currVehicleStatics = this.vehiclesStatics.asObservable();

  updateVehicleStatics(newStatics: Object) {
    this.vehiclesStatics.next(newStatics);
    localStorage.setItem('vehiclesStatics', JSON.stringify(newStatics));
  }
}
