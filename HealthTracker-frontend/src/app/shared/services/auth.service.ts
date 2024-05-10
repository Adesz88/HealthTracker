import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NewUser, UserToLogin } from "../models/user";
import { Observable } from "rxjs";
import { BASEURL } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserToLogin): Observable<any> {
    return this.http.post(`${BASEURL}/users/login`, user);
  }

  logout(): Observable<any> {
    return this.http.delete(`${BASEURL}/users/logout`);
  }

  register(user: NewUser): Observable<any> {
    return this.http.post(`${BASEURL}/users/register`, user);
  }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${BASEURL}/users/`);
  }
}
