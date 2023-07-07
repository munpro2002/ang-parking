export interface Registerinfo {
  ownerName: string;
  licensePlate: string;
  carType: number;
  otherService: {
    oilChange: boolean;
    carWash: boolean;
  };
  regDateTime: Date;
  fee?: number;
}
