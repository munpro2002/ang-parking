import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class vehicleFeeService {
  private vehiclesFee = new BehaviorSubject(
    JSON.parse(localStorage.getItem('fee')!) || {
      fseated: 5,
      sseated: 7,
      truck: 10,
    }
  );

  curVehiclesFee = this.vehiclesFee.asObservable();

  updateVehicleFee(newFee: Object) {
    this.vehiclesFee.next(newFee);
    localStorage.setItem('fee', JSON.stringify(newFee));
  }
}
