import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee.model";
import {Attendance} from "../models/attendance.model";

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  backendHost:string="http://localhost:8085";

  constructor(private http: HttpClient) {}

  markAttendance(employeeId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { employeeId: employeeId };
    return this.http.post(`${this.backendHost}/attendance`, body, { headers });
  }
  public searchAttendances(keyword:string): Observable<Array<Attendance>> {
    return this.http.get<Array<Attendance>>(this.backendHost+"/attendances/search?keyword=" + keyword)
  }
}
