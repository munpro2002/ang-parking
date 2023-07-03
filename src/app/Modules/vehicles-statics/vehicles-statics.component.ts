import { Component, OnInit } from '@angular/core';
import { parkingRevenueService } from 'src/app/services/parking-revenue.service';

@Component({
  selector: 'app-vehicles-statics',
  templateUrl: './vehicles-statics.component.html',
  styleUrls: ['./vehicles-statics.component.scss'],
})
export class VehiclesStaticsComponent implements OnInit {
  dataStatics: any;

  constructor(private parkingService: parkingRevenueService) {}

  ngOnInit() {
    this.parkingService.currVehicleStatics.subscribe(
      (statics) => (this.dataStatics = statics)
    );
  }

  clearStaticsHandler() {
    this.parkingService.updateVehicleStatics({
      fseated: {
        in: 0,
        out: 0,
        revenue: 0,
      },
      sseated: {
        in: 0,
        out: 0,
        revenue: 0,
      },
      truck: {
        in: 0,
        out: 0,
        revenue: 0,
      },
    });
  }
}
