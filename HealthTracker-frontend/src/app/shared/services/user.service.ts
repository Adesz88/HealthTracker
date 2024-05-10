import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASEURL } from "../constants";
import { UpdatedUser } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${BASEURL}/users/current`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${BASEURL}/users/doctors`);
  }

  updateCurrentUser(user: UpdatedUser): Observable<any> {
    return this.http.put(`${BASEURL}/users/current`, user);
  }
}
