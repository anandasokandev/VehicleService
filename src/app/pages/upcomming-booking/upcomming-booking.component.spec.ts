import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingBookingComponent } from './upcomming-booking.component';

describe('UpcommingBookingComponent', () => {
  let component: UpcommingBookingComponent;
  let fixture: ComponentFixture<UpcommingBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcommingBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcommingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
