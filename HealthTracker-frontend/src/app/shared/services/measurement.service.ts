import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASEURL } from "../constants";
import { NewMeasurement } from "../models/measurement";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get(`${BASEURL}/measurements/types`);
  }

  getUserMeasurements(date: Date): Observable<any> {
    const dateString = date.toLocaleDateString("en-CA");
    return this.http.get(`${BASEURL}/measurements/?date=${dateString}`);
  }

  getMeasurements(date: Date): Observable<any> {
    const dateString = date.toLocaleDateString("en-CA");
    return this.http.get(`${BASEURL}/measurements/tracked/?date=${dateString}`);
  }

  addMeasurement(measurement: NewMeasurement): Observable<any> {
    return this.http.post(`${BASEURL}/measurements/new`, measurement);
  }

  deleteUserMeasurement(id: string): Observable<any> {
    return this.http.delete(`${BASEURL}/measurements/${id}`);
  }
}
