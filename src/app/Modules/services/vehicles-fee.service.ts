import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vehiclesfee, vehiclesFeeBase } from '../interfaces/vehiclesfee';

@Injectable()
export class vehicleFeeService {
  private vehiclesFee = new BehaviorSubject(
    JSON.parse(localStorage.getItem('fee')!) || vehiclesFeeBase
  );

  curVehiclesFee = this.vehiclesFee.asObservable();

  updateVehicleFee(newFee: Vehiclesfee) {
    this.vehiclesFee.next(newFee);
    localStorage.setItem('fee', JSON.stringify(newFee));
  }
}
