import { Component, OnInit } from '@angular/core';
import { registerVehiclesService } from './services/register-vehicles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isShowRegisterInfo: boolean = true;
  isShowVehiclesStatics: boolean = false;
  regList: any;

  constructor(private registerService: registerVehiclesService) {}

  ngOnInit() {
    this.registerService.currRegisterInfo.subscribe((list: any) => {
      this.regList = list;
    });
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
