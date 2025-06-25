import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingHistoryComponent } from './admin-booking-history.component';

describe('AdminBookingHistoryComponent', () => {
  let component: AdminBookingHistoryComponent;
  let fixture: ComponentFixture<AdminBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
