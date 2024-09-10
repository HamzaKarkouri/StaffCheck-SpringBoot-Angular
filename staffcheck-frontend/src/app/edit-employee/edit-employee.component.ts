import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee.model";

import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  updateEmployeeFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private serviceEmployee: EmployeeService, private router: ActivatedRoute,
              private routerNav: Router) {
  }

  ngOnInit(): void {
    this.updateEmployeeFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required,Validators.email]],
      id: [null],
      phoneNumber: [null, [Validators.required]],
      joining: [null, [Validators.required]],
      role: [null, [Validators.required]],
      department: [null, [Validators.required]],
      image: [null, [Validators.required]],
      qr: [null, [Validators.required]],
    });
    this.getEmployee();
  }

  updateEmployee() {
    let employee: Employee = this.updateEmployeeFormGroup.value;
    employee.id = this.router.snapshot.params['id'];
    this.serviceEmployee.updateEmployee(employee).subscribe(
      {
        next: data => {
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: "The employee has been successfully updated !",
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          this.goBack();
        },
        error: err => {
          // Gérer les erreurs ici
        }
      }
    );
  }

  private getEmployee() {
    this.serviceEmployee.getEmployeeById(this.router.snapshot.params['id']).subscribe(
      {
        next: data => {
          let employee: Employee = data;
          this.updateEmployeeFormGroup.patchValue({
            email: employee.email,
            name: employee.name,
            id: employee.id,
            phoneNumber: employee.phoneNumber,
            joining: employee.joining,
            role: employee.role,
            department: employee.department,
            image : employee.image,
            qr:employee.qr
          });
        },
        error: err => {
          // Gérer les erreurs ici
        }
      }
    );
  }

  goBack() {
    this.routerNav.navigate(['/admin/employees']);

  }
}
