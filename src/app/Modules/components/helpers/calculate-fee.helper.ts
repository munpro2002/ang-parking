import { Vehiclesfee } from '../../interfaces/vehiclesfee';

export const calculateFee = (
  regDate: Date,
  vehiclesFee: Vehiclesfee,
  carType: number
) => {
  let fee: number = 0;
  let currentDate: Date = new Date();
  regDate = new Date(regDate);
  let dateInUse = currentDate.getDay() - regDate.getDay();

  if (dateInUse < 0) dateInUse = 0;

  if (carType.toString() === '0') {
    fee = (dateInUse + 1) * vehiclesFee.fseated;
  } else if (carType.toString() === '1') {
    fee = (dateInUse + 1) * vehiclesFee.sseated;
  } else if (carType.toString() === '2') {
    fee = (dateInUse + 1) * vehiclesFee.truck;
  }
  return fee;
};
