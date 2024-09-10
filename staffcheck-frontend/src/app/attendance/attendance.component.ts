import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Employee} from "../models/employee.model";
import {Attendance} from "../models/attendance.model";
import {AuthService} from "../services/auth.service";
import {EmployeeService} from "../services/employee.service";
import {Router} from "@angular/router";
import {ScannerService} from "../services/scanner.service";

@Component({
  selector: 'app-attendance',
  standalone: true,
    imports: [
        NgForOf,
        FormsModule,
        AsyncPipe,
        DatePipe,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit{
  attendances$!: Observable<Array<Attendance>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup | undefined;
    newAttendanceFormGroup!: FormGroup;
    constructor(private authService:AuthService,private scannerService: ScannerService, private formBuilder: FormBuilder,private router:Router) { }

    ngOnInit(): void {
        this.searchFormGroup = this.formBuilder.group({
            keyword: this.formBuilder.control("")
        });
        this.handleSearchattendances();





        this.newAttendanceFormGroup = this.formBuilder.group({
            name: this.formBuilder.control(null,[Validators.required, Validators.minLength(4)]),
            day: this.formBuilder.control(null,[Validators.required, Validators.email]),
            checkin:this.formBuilder.control(null,[Validators.required]) ,
            checkout: this.formBuilder.control(null,[Validators.required,]),
            working: this.formBuilder.control(null,[Validators.required,]),

            image: this.formBuilder.control(null, [Validators.required])
        });
    }

    handleSearchattendances() {
        let kw = this.searchFormGroup?.value.keyword;
        this.attendances$ = this.scannerService.searchAttendances(kw).pipe(
            catchError(err => {
                this.errorMessage = err.message;
                return throwError(err);
            }),
            map(attendances => {
                attendances.forEach(attendance => {
                    if (attendance.image) {
                        // Decode base64 string to data URL
                        attendance.image = 'data:image/png;base64,' + attendance.image;
                    }
                });
                return attendances; // Return modified employees array
            })
        );

    }

}
