import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenterInputComponent } from './service-center-input.component';

describe('ServiceCenterInputComponent', () => {
  let component: ServiceCenterInputComponent;
  let fixture: ComponentFixture<ServiceCenterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCenterInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCenterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
