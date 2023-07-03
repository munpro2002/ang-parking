import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class registerVehiclesService {
  private registerInfo = new BehaviorSubject(
    JSON.parse(localStorage.getItem('regInfo')!) || []
  );

  currRegisterInfo = this.registerInfo.asObservable();

  updateInfoList(
    newInfoList: Array<{
      ownerName: string;
      licensePlate: string;
      carType: number;
      regDateTime: Date;
    }>
  ) {
    this.registerInfo.next(newInfoList);
    localStorage.setItem('regInfo', JSON.stringify(newInfoList));
  }
}
