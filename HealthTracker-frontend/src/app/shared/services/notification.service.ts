import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASEURL } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    return this.http.get(`${BASEURL}/notifications/`);
  }

  deleteNotifications(): Observable<any> {
    return this.http.delete(`${BASEURL}/notifications/`);
  }
}
