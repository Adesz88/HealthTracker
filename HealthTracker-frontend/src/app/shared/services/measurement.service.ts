import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASEURL } from "../constants";
import { Measurement } from "../models/measurement";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get(`${BASEURL}/measurements/types`);
  }

  addMeasurement(measurement: Measurement): Observable<any> {
    return this.http.post(`${BASEURL}/measurements/new`, measurement);
  }
}
