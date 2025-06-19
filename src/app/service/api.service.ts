import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:7176/api/'

  login(loginData: any): any {
    return this.http.post(`${this.apiUrl}Authentication/Login`, loginData, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}Authentication/Logout`);
  }

  fetchUserBooking(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Booking/ViewBookingByUserId/${userId}`, {
      withCredentials: true
    });
  }

  fetchVehicleByUser(userId: number): Observable<any[]> {
     return this.http.get<any[]>(`${this.apiUrl}Vehicle/ViewVehicleByUser/${userId}`, {
      withCredentials: true
    });
  }
}
