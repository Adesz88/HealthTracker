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

  getUserMeasurements(): Observable<any> {
  return this.http.get(`${BASEURL}/measurements/`);
  }

  addMeasurement(measurement: NewMeasurement): Observable<any> {
    return this.http.post(`${BASEURL}/measurements/new`, measurement);
  }
}
