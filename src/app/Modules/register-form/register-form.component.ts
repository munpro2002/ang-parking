import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { vehicleFeeService } from 'src/app/services/vehicles-fee.service';
import { registerVehiclesService } from 'src/app/services/register-vehicles.service';
import { parkingRevenueService } from 'src/app/services/parking-revenue.service';

import { FormBuilder, Validators } from '@angular/forms';
import { noSpace } from '../validations/no-space.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  todayTime = new Date();
  regForm: any;
  editFeeForm: any;
  feeService: any;
  numRegex: string = '[0-9]+';
  letterRegex: string = '[a-zA-Z ]+';
  displayEditFee: string = 'none';
  regList: Array<any> = [];
  vehiclesStatics: any = {};

  constructor(
    fb: FormBuilder,
    private registerService: registerVehiclesService,
    private parkingService: parkingRevenueService,
    private vehicleService: vehicleFeeService
  ) {
    this.regForm = fb.group({
      ownerName: [
        '',
        [Validators.required, Validators.pattern(this.letterRegex)],
      ],
      licensePlate: [
        '',
        [
          Validators.required,
          Validators.pattern(this.numRegex),
          noSpace.noSpaceValidations,
        ],
      ],
      carType: ['', Validators.required],
      regDateTime: ['', Validators.required],
    });

    this.editFeeForm = fb.group({
      fseated: ['', Validators.required],
      sseated: ['', Validators.required],
      truck: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.registerService.currRegisterInfo.subscribe(
      (list: Array<any>) => (this.regList = list)
    );
    this.parkingService.currVehicleStatics.subscribe(
      (statics) => (this.vehiclesStatics = statics)
    );
    this.vehicleService.curVehiclesFee.subscribe(
      (fee) => (this.feeService = fee)
    );
    console.log(this.feeService);
  }

  get ownerName() {
    return this.regForm.get('ownerName');
  }

  get licensePlate() {
    return this.regForm.get('licensePlate');
  }

  get carType() {
    return this.regForm.get('carType');
  }

  get regDateTime() {
    return this.regForm.get('regDateTime');
  }

  openPopup() {
    this.displayEditFee = 'block';
  }

  closePopup() {
    console.log('hello');
    this.displayEditFee = 'none';
  }

  submitEditFeeHandler(f: NgForm) {
    console.log(f.value);

    this.vehicleService.updateVehicleFee(f.value);

    this.closePopup();
  }

  submitRegFormHandler(f: NgForm) {
    if (f.value.carType.toString() === '0') {
      this.vehiclesStatics.fseated.in += 1;
    } else if (f.value.carType.toString() === '1') {
      this.vehiclesStatics.sseated.in += 1;
    } else if (f.value.carType.toString() === '2') {
      this.vehiclesStatics.truck.in += 1;
    }

    this.parkingService.updateVehicleStatics(this.vehiclesStatics);
    this.registerService.updateInfoList([f.value, ...this.regList]);

    f.reset();
  }
}
