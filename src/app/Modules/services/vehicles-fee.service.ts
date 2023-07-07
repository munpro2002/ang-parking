import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vehiclesfee, FEE_BASE_VALUE } from '../interfaces/vehiclesfee';

@Injectable()
export class vehicleFeeService {
  private vehiclesFee = new BehaviorSubject(
    JSON.parse(localStorage.getItem('fee')!) || FEE_BASE_VALUE
  );

  curVehiclesFee = this.vehiclesFee.asObservable();

  updateVehicleFee(newFee: Vehiclesfee) {
    this.vehiclesFee.next(newFee);
    localStorage.setItem('fee', JSON.stringify(newFee));
  }
}
