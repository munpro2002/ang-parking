import { Component, OnInit } from '@angular/core';
import { parkingRevenueService } from '../../services/parking-revenue.service';
import { registerVehiclesService } from '../../services/register-vehicles.service';
import { ToastrService } from 'ngx-toastr';

import { Registerinfo } from '../../interfaces/registerinfo';
import {
  Parkingrevenue,
  parkingRevenueBaseValue,
} from '../../interfaces/parkingrevenue';

@Component({
  selector: 'app-vehicles-statics',
  templateUrl: './vehicles-statics.component.html',
  styleUrls: ['./vehicles-statics.component.scss'],
})
export class VehiclesStaticsComponent implements OnInit {
  dataStatics: Parkingrevenue = parkingRevenueBaseValue;
  regList: Array<Registerinfo> = [];

  constructor(
    private parkingService: parkingRevenueService,
    private registerService: registerVehiclesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.parkingService.currVehicleStatics.subscribe(
      (statics: Parkingrevenue) => (this.dataStatics = statics)
    );

    this.registerService.currRegisterInfo.subscribe(
      (list: Array<Registerinfo>) => {
        this.regList = list;
      }
    );
  }

  clearStaticsHandler() {
    let resetValue = {
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
    };

    this.parkingService.updateVehicleStatics(resetValue);
    this.registerService.updateInfoList([]);

    this.toastr.warning('You just have deleted all records', 'Warning', {
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
    });
  }
}
