import { Component, OnInit } from '@angular/core';
import { registerVehiclesService } from 'src/app/services/register-vehicles.service';
import { parkingRevenueService } from 'src/app/services/parking-revenue.service';
import { vehicleFeeService } from 'src/app/services/vehicles-fee.service';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.scss'],
})
export class RegisterInfoComponent implements OnInit {
  regList: Array<{
    ownerName: string;
    licensePlate: string;
    carType: number;
    regDateTime: Date;
    fee?: number;
  }> = [];
  vehiclesStatics: any;
  vehiclesFee: any;

  constructor(
    private registerService: registerVehiclesService,
    private parkingService: parkingRevenueService,
    private feeService: vehicleFeeService
  ) {}

  ngOnInit() {
    this.feeService.curVehiclesFee.subscribe((fee) => (this.vehiclesFee = fee));

    this.registerService.currRegisterInfo.subscribe((list: any) => {
      this.regList = list;

      this.regList.forEach((info, index) => {
        let fee: number = 0;
        let currentDate: Date = new Date();
        let regDate = new Date(info.regDateTime);
        let dateInUse = currentDate.getDay() - regDate.getDay();

        if (dateInUse < 0) dateInUse = 0;

        if (info.carType.toString() === '0') {
          fee = (dateInUse + 1) * this.vehiclesFee.fseated;
        } else if (info.carType.toString() === '1') {
          fee = (dateInUse + 1) * this.vehiclesFee.sseated;
        } else if (info.carType.toString() === '2') {
          fee = (dateInUse + 1) * this.vehiclesFee.truck;
        }

        this.regList[index].fee = fee;
      });
    });

    this.parkingService.currVehicleStatics.subscribe(
      (statics) => (this.vehiclesStatics = statics)
    );
  }

  deleteInfoHandler(id: number) {
    let newRegList = this.regList.filter((item, index) => index !== id);

    if (this.regList[id].carType.toString() === '0') {
      this.vehiclesStatics.fseated.in -= 1;
      this.vehiclesStatics.fseated.out += 1;
      this.vehiclesStatics.fseated.revenue += this.regList[id].fee;
    } else if (this.regList[id].carType.toString() === '1') {
      this.vehiclesStatics.sseated.in -= 1;
      this.vehiclesStatics.sseated.out += 1;
      this.vehiclesStatics.sseated.revenue += this.regList[id].fee;
    } else if (this.regList[id].carType.toString() === '2') {
      this.vehiclesStatics.truck.in -= 1;
      this.vehiclesStatics.truck.out += 1;
      this.vehiclesStatics.truck.revenue += this.regList[id].fee;
    }

    this.parkingService.updateVehicleStatics(this.vehiclesStatics);
    this.registerService.updateInfoList(newRegList);
  }
}
