import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { ScannerService } from '../services/scanner.service';
import {Employee} from "../models/employee.model";
import {Observable} from "rxjs";
import {EmployeeService} from "../services/employee.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ZXingScannerModule,
        RouterLink,
        NgOptimizedImage,
        NgIf,

    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup;
  constructor(private fb:FormBuilder,private scannerService: ScannerService,private authService:AuthService,private router:Router,private http: HttpClient){}
  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }
  handleLogin() {
    let username=this.formLogin.value.username
    let password =this.formLogin.value.password
    this.authService.login(username,password).subscribe({
      next:data=>{
        console.log(data)
        this.authService.loadProfile(data)
        this.router.navigateByUrl("/admin/dashboard")
      },
      error:error=>{
        console.log(error);
      }
    })
  }



  handleQrCodeResult(qrCodeString: string) {
    const employeeId = this.extractEmployeeIdFromQrCode(qrCodeString);
    this.markAttendance(employeeId);
  }

  extractEmployeeIdFromQrCode(qrCodeString: string): number {
    // Implement this method based on how the QR code data is structured
    // For example, if the QR code contains 'Employee ID: 123', you might extract '123'
    const employeeId = parseInt(qrCodeString.split(':')[1].trim(), 10);
    return employeeId;
  }

  markAttendance(employeeId: number) {

    this.scannerService.markAttendance(employeeId).subscribe({
      next: (response) => {
        console.log('Attendance marked successfully', response);
        alert('Attendance marked successfully');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Error marking attendance', error);
        alert('Error marking attendance');
      }
    });
  }











}
