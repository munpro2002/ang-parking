import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Registerinfo } from '../interfaces/registerinfo';

@Injectable()
export class registerVehiclesService {
  private registerInfo = new BehaviorSubject(
    JSON.parse(localStorage.getItem('regInfo')!) || []
  );

  currRegisterInfo = this.registerInfo.asObservable();

  updateInfoList(newInfoList: Array<Registerinfo>) {
    this.registerInfo.next(newInfoList);
    localStorage.setItem('regInfo', JSON.stringify(newInfoList));
  }
}
