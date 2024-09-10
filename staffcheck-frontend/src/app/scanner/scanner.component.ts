import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import {Router} from "@angular/router";

import { isPlatformBrowser } from '@angular/common';
import {NgForOf, NgIf} from "@angular/common";
import {ScannerService} from "../services/scanner.service";
import { BehaviorSubject } from 'rxjs';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [

    NgIf,
    NgForOf,
    ZXingScannerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent implements OnInit{
  eId: number = 0;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice!: MediaDeviceInfo;
  isBrowser: boolean;
  ngOnInit(): void {
    if (this.isBrowser) {
      // Check for camera devices and permissions
      this.checkCameras();
    }




  }

  constructor(

    private scannerService: ScannerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  onSubmit() {
    if (this.eId) {
      this.markAttendance(this.eId);
    }
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
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (error) => {
        console.error('Error marking attendance', error);
        alert('Error marking attendance');
      }
    });
  }





  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = devices && devices.length > 0;
    if (this.hasDevices) {
      this.availableDevices = devices;
      this.currentDevice = devices[0];
      console.error('Cameras found.');
    }
  }

  onCamerasNotFound(): void {
    console.error('No cameras found.');
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  onPermissionResponse(permission: boolean): void {
    this.hasPermission = permission;
    console.error('Has permission.');
  }

  onScanError(error: any): void {
    console.error('Scan error: ', error);
  }

  onDeviceSelectChange(event: Event): void {
    const selected = (event.target as HTMLSelectElement).value;
    const device = this.availableDevices.find(d => d.deviceId === selected);
    if (device) {
      this.currentDevice = device;
    }
  }

  private checkCameras(): void {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.onCamerasFound(devices.filter(device => device.kind === 'videoinput'));
    }).catch(err => this.onScanError(err));
  }
}
