import { Vehiclesfee } from '../interfaces/vehiclesfee';
import { Registerinfo } from '../interfaces/registerinfo';

export const calculateFee = (
  regInfo: Registerinfo,
  vehiclesFee: Vehiclesfee
) => {
  let fee: number = 0;
  let currentDate: Date = new Date();
  let regDate = new Date(regInfo.regDateTime);
  let carType = regInfo.carType;
  let oilChangeService = regInfo.otherService.oilChange;
  let carWashService = regInfo.otherService.carWash;
  let dateInUse = Math.floor(
    (currentDate.getTime() - regDate.getTime()) / (24 * 3600 * 1000)
  );

  if (dateInUse < 0) dateInUse = 0;

  if (carType.toString() === '0') {
    fee = (dateInUse + 1) * vehiclesFee.fseater;
  } else if (carType.toString() === '1') {
    fee = (dateInUse + 1) * vehiclesFee.sseater;
  } else if (carType.toString() === '2') {
    fee = (dateInUse + 1) * vehiclesFee.truck;
  }

  if (oilChangeService) fee += 10;
  if (carWashService) fee += 10;

  return fee;
};
