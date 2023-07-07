import { Component, OnInit } from '@angular/core';
import { parkingRevenueService } from '../../services/parking-revenue.service';
import { registerVehiclesService } from '../../services/register-vehicles.service';
import { ToastrService } from 'ngx-toastr';

import { Registerinfo } from '../../interfaces/registerinfo';
import {
  Parkingrevenue,
  STATICS_BASE_VALUE,
} from '../../interfaces/parkingrevenue';

@Component({
  selector: 'app-vehicles-statics',
  templateUrl: './vehicles-statics.component.html',
  styleUrls: ['./vehicles-statics.component.scss'],
})
export class VehiclesStaticsComponent implements OnInit {
  dataStatics: Parkingrevenue = STATICS_BASE_VALUE;
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
      fseater: {
        in: 0,
        out: 0,
        revenue: 0,
      },
      sseater: {
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
