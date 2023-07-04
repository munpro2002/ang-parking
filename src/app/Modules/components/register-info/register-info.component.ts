import { Component, OnInit } from '@angular/core';

import { registerVehiclesService } from 'src/app/Modules/services/register-vehicles.service';
import { parkingRevenueService } from 'src/app/Modules/services/parking-revenue.service';
import { vehicleFeeService } from 'src/app/Modules/services/vehicles-fee.service';

import {
  Parkingrevenue,
  parkingRevenueBaseValue,
} from 'src/app/Modules/interfaces/parkingrevenue';
import {
  Vehiclesfee,
  vehiclesFeeBase,
} from 'src/app/Modules/interfaces/vehiclesfee';
import { Registerinfo } from 'src/app/Modules/interfaces/registerinfo';

import { calculateFee } from '../helpers/calculate-fee.helper';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.scss'],
})
export class RegisterInfoComponent implements OnInit {
  regList: Array<Registerinfo> = [];

  vehiclesStatics: Parkingrevenue = parkingRevenueBaseValue;
  vehiclesFee: Vehiclesfee = vehiclesFeeBase;

  searchText: string = '';

  constructor(
    private registerService: registerVehiclesService,
    private parkingService: parkingRevenueService,
    private feeService: vehicleFeeService
  ) {}

  ngOnInit() {
    this.feeService.curVehiclesFee.subscribe(
      (fee: Vehiclesfee) => (this.vehiclesFee = fee)
    );

    this.registerService.currRegisterInfo.subscribe(
      (list: Array<Registerinfo>) => {
        this.regList = list;

        this.regList.forEach((info, index) => {
          let fee = calculateFee(
            info.regDateTime,
            this.vehiclesFee,
            info.carType
          );
          this.regList[index].fee = fee;
        });
      }
    );

    this.parkingService.currVehicleStatics.subscribe(
      (statics: Parkingrevenue) => (this.vehiclesStatics = statics)
    );
  }

  deleteInfoHandler(id: number) {
    let newRegList = this.regList.filter((item, index) => index !== id);

    if (this.regList[id].carType.toString() === '0') {
      this.vehiclesStatics.fseated.in -= 1;
      this.vehiclesStatics.fseated.out += 1;
      this.vehiclesStatics.fseated.revenue += this.regList[id].fee || 0;
    } else if (this.regList[id].carType.toString() === '1') {
      this.vehiclesStatics.sseated.in -= 1;
      this.vehiclesStatics.sseated.out += 1;
      this.vehiclesStatics.sseated.revenue += this.regList[id].fee || 0;
    } else if (this.regList[id].carType.toString() === '2') {
      this.vehiclesStatics.truck.in -= 1;
      this.vehiclesStatics.truck.out += 1;
      this.vehiclesStatics.truck.revenue += this.regList[id].fee || 0;
    }

    this.parkingService.updateVehicleStatics(this.vehiclesStatics);
    this.registerService.updateInfoList(newRegList);
  }
}
