import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:7176/api/'

  login(loginData: any) : any {
    return this.http.post(`${this.apiUrl}Authentication`,loginData);
  }
}
