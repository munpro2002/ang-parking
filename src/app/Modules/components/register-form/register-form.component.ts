import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { vehicleFeeService } from '../../services/vehicles-fee.service';
import { registerVehiclesService } from '../../services/register-vehicles.service';
import { parkingRevenueService } from '../../services/parking-revenue.service';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, Validators } from '@angular/forms';
import { noSpace } from '../../validations/no-space.validator';
import { checkExistVehicle } from '../../validations/dup-register.validator';

import { Registerinfo } from '../../interfaces/registerinfo';
import { Vehiclesfee, FEE_BASE_VALUE } from '../../interfaces/vehiclesfee';
import {
  Parkingrevenue,
  STATICS_BASE_VALUE,
} from '../../interfaces/parkingrevenue';

import { calculateFee } from '../../helpers/calculate-fee.helper';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  regForm: any;
  editFeeForm: any;

  numRegex: string = '[0-9]+';
  letterRegex: string = '[a-zA-Z ]+';
  displayEditFee: string = 'none';

  feeService: Vehiclesfee = FEE_BASE_VALUE;
  regList: Array<Registerinfo> = [];
  vehiclesStatics: Parkingrevenue = STATICS_BASE_VALUE;

  constructor(
    fb: FormBuilder,
    private registerService: registerVehiclesService,
    private parkingService: parkingRevenueService,
    private vehicleService: vehicleFeeService,
    private toastr: ToastrService
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
      otherService: fb.group({
        oilChange: [false],
        carWash: [false],
      }),
      regDateTime: ['', Validators.required],
    });

    this.editFeeForm = fb.group({
      fseater: ['', Validators.required],
      sseater: ['', Validators.required],
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

  get otherService() {
    return this.regForm.get('otherService');
  }

  openPopup() {
    this.displayEditFee = 'block';
  }

  closePopup() {
    this.displayEditFee = 'none';
  }

  submitEditFeeHandler(f: NgForm) {
    this.vehicleService.updateVehicleFee({
      ...f.value,
      oilChange: 10,
      carWash: 10,
    });

    let newRegList = this.regList;
    newRegList.forEach((reg, id) => {
      let fee = calculateFee(reg, this.feeService);

      newRegList[id].fee = fee;
    });

    this.registerService.updateInfoList(newRegList);

    this.toastr.info('You just have edited parking fee', 'NOTE', {
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
    });

    this.closePopup();
  }

  submitRegFormHandler(f: NgForm) {
    let isExisted = checkExistVehicle(f.value.licensePlate, this.regList);

    console.log(f.value, this.vehiclesStatics);

    if (isExisted) {
      this.toastr.error('The license was already registered', 'ERROR', {
        closeButton: true,
        progressBar: true,
        timeOut: 3000,
      });
    } else {
      if (f.value.carType.toString() === '0') {
        this.vehiclesStatics.fseater.in += 1;
      } else if (f.value.carType.toString() === '1') {
        this.vehiclesStatics.sseater.in += 1;
      } else if (f.value.carType.toString() === '2') {
        this.vehiclesStatics.truck.in += 1;
      }

      this.parkingService.updateVehicleStatics(this.vehiclesStatics);
      this.registerService.updateInfoList([f.value, ...this.regList]);
      this.toastr.success('Successfully add new record', 'BRAVO', {
        closeButton: true,
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr ngx-toastr--success',
      });
    }

    f.reset();
  }
}
