import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  backendHost:string="http://localhost:8085";
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.backendHost+"/employees")
  }
  public searchEmployees(keyword:string): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.backendHost+"/employees/search?keyword=" + keyword)
  }
  public saveEmployees(employee:Employee): Observable<Employee> {
    return this.http.post<Employee>(this.backendHost+"/employees",employee)
}
  public deleteEmployee(id:number) {
    return this.http.delete(this.backendHost+"/employees/"+id)
  }

  updateEmployee(employee: Employee): Observable<Array<Employee>> {
    return this.http.put<Array<Employee>>(this.backendHost + "/employee/" + employee.id, employee);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.backendHost + "/employees/" + id);
  }



}
