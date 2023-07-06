import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesStaticsComponent } from './vehicles-statics.component';

describe('VehiclesStaticsComponent', () => {
  let component: VehiclesStaticsComponent;
  let fixture: ComponentFixture<VehiclesStaticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesStaticsComponent]
    });
    fixture = TestBed.createComponent(VehiclesStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
