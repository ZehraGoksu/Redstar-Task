import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiCountyUrl: string = 'https://napi.sevkiyatvar.com/ulke';  
  private apiCityUrl: string = 'https://napi.sevkiyatvar.com/il';  

  constructor(private http: HttpClient) {}

  getCountryData(): Observable<any> {
    return this.http.get<any>(`${this.apiCountyUrl}`);
  }

  postCountryData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiCountyUrl}`, data);
  }

  getCityData(): Observable<any> {
    return this.http.get<any>(`${this.apiCityUrl}`);
  }

  postCityData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiCityUrl}`, data);
  }
}
