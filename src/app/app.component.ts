import { Component, OnInit } from '@angular/core';
import { registerVehiclesService } from './Modules/services/register-vehicles.service';
import { Registerinfo } from './Modules/interfaces/registerinfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isShowRegisterInfo: boolean = true;
  isShowVehiclesStatics: boolean = false;
  regList: Array<Registerinfo> = [];

  constructor(private registerService: registerVehiclesService) {}

  ngOnInit() {
    this.registerService.currRegisterInfo.subscribe(
      (list: Array<Registerinfo>) => {
        this.regList = list;
      }
    );
  }

  staticsDisplayHandler() {
    this.isShowVehiclesStatics = false;
    this.isShowRegisterInfo = true;
  }

  registerDisplayHandler() {
    this.isShowVehiclesStatics = true;
    this.isShowRegisterInfo = false;
  }
}
