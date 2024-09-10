import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Employee} from "../models/employee.model";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  numberOfEmployees: number = 0;
  employees$!: Observable<Array<Employee>>;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.countEmployees();
  }

  countEmployees(): void {
    this.employeeService.getEmployees()
        .subscribe(employees => {
          this.numberOfEmployees = employees.length;
        });
  }

}
