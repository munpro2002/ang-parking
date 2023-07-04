import { Registerinfo } from '../interfaces/registerinfo';

export const checkExistVehicle = (
  license: string,
  regList: Array<Registerinfo>
) => {
  let isExisted = false;

  regList.forEach((reg) => {
    if (reg.licensePlate === license) {
      isExisted = true;
    }
  });

  return isExisted;
};
