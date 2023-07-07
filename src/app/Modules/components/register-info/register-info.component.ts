import { Component, OnInit } from '@angular/core';

import { registerVehiclesService } from 'src/app/Modules/services/register-vehicles.service';
import { parkingRevenueService } from 'src/app/Modules/services/parking-revenue.service';
import { vehicleFeeService } from 'src/app/Modules/services/vehicles-fee.service';
import { ToastrService } from 'ngx-toastr';

import {
  Parkingrevenue,
  STATICS_BASE_VALUE,
} from 'src/app/Modules/interfaces/parkingrevenue';
import {
  Vehiclesfee,
  FEE_BASE_VALUE,
} from 'src/app/Modules/interfaces/vehiclesfee';
import { Registerinfo } from 'src/app/Modules/interfaces/registerinfo';

import { calculateFee } from '../../helpers/calculate-fee.helper';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.scss'],
})
export class RegisterInfoComponent implements OnInit {
  regList: Array<Registerinfo> = [];

  vehiclesStatics: Parkingrevenue = STATICS_BASE_VALUE;
  vehiclesFee: Vehiclesfee = FEE_BASE_VALUE;

  searchText: string = '';

  constructor(
    private registerService: registerVehiclesService,
    private parkingService: parkingRevenueService,
    private feeService: vehicleFeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.feeService.curVehiclesFee.subscribe(
      (fee: Vehiclesfee) => (this.vehiclesFee = fee)
    );

    this.registerService.currRegisterInfo.subscribe(
      (list: Array<Registerinfo>) => {
        this.regList = list;

        this.regList.forEach((info, index) => {
          let fee = calculateFee(info, this.vehiclesFee);
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
    let newVehiclesStatics = this.vehiclesStatics;

    if (this.regList[id].carType.toString() === '0') {
      newVehiclesStatics.fseater.in -= 1;
      newVehiclesStatics.fseater.out += 1;
      newVehiclesStatics.fseater.revenue += this.regList[id].fee || 0;
    } else if (this.regList[id].carType.toString() === '1') {
      newVehiclesStatics.sseater.in -= 1;
      newVehiclesStatics.sseater.out += 1;
      newVehiclesStatics.sseater.revenue += this.regList[id].fee || 0;
    } else if (this.regList[id].carType.toString() === '2') {
      newVehiclesStatics.truck.in -= 1;
      newVehiclesStatics.truck.out += 1;
      newVehiclesStatics.truck.revenue += this.regList[id].fee || 0;
    }

    this.parkingService.updateVehicleStatics(newVehiclesStatics);
    this.registerService.updateInfoList(newRegList);

    this.toastr.info('You just have deleted one record', 'NOTE', {
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
    });
  }
}
