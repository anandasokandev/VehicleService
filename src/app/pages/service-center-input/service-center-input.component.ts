import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-center-input',
  imports: [],
  templateUrl: './service-center-input.component.html',
  styleUrl: './service-center-input.component.css'
})
export class ServiceCenterInputComponent {

  @Input() searchType: string = '';
}
