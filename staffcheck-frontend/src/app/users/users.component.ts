import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {async, catchError, map, Observable, throwError} from "rxjs";
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { CommonModule } from '@angular/common';
// import Swal from "sweetalert2";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-users',
  standalone: true,
    imports: [
        FormsModule,
        NgClass,
        DatePipe,
        NgForOf,
        CommonModule,
        ReactiveFormsModule
    ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  showModal = false; // Make sure this is initialized to false
  newEmployee: any = {};
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number=5
  employees$!: Observable<Array<Employee>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup | undefined;
  newEmployeeFormGroup!: FormGroup;
  selectedFileName: string = '';

  constructor(private authService:AuthService,private employeeService: EmployeeService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });
    this.handleSearchemployees();




    this.newEmployeeFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(null,[Validators.required, Validators.minLength(4)]),
      email: this.formBuilder.control(null,[Validators.required, Validators.email]),
      phoneNumber:this.formBuilder.control(null,[Validators.required]) ,
      joining: this.formBuilder.control(null,[Validators.required,]),
      department: this.formBuilder.control(null,[Validators.required,]),
      role: this.formBuilder.control(null,[Validators.required,]),
      image: this.formBuilder.control(null, [Validators.required])
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.encodeFileToBase64(file);
      this.selectedFileName = file.name; // Store the selected filename
    }
  }
  encodeFileToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String: string = reader.result as string;
      this.newEmployeeFormGroup.patchValue({
        image: base64String.split(',')[1]  // Remove 'data:image/png;base64,' part
      });
    };
    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
    };
  }
  handleSearchemployees() {
    let kw = this.searchFormGroup?.value.keyword;
    this.employees$ = this.employeeService.searchEmployees(kw).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }),
        map(employees => {
          employees.forEach(employee => {
            if (employee.image) {
              // Decode base64 string to data URL
              employee.image = 'data:image/png;base64,' + employee.image;
            }
          });
          return employees; // Return modified employees array
        })
    );

  }
  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchemployees();
  }
  handleDeleteEmployee(e: Employee) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.employeeService.deleteEmployee(e.id).subscribe({
      next: (resp) => {
        this.employees$ = this.employees$.pipe(
          map(data => {
            let index = data.indexOf(e);
            data.splice(index, 1);  // Utilisez splice pour supprimer l'élément correctement
            return data;
          })
        );
      },
      error: err => {
        console.log(err);

        alert("You do not have permission to delete this employee for traceability reasons.");

      }
    });
  }

  handleEditEmployee() {
    throw new Error('Method not implemented.');
  }


  handleUpdateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee)
    this.router.navigateByUrl("admin/edit-employee/" + employee.id);

  }














  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newEmployee = {}; // Clear new employee object when modal is closed
  }


















  handleSaveEmployee() {
    let employee: Employee = this.newEmployeeFormGroup.value;

// employee.image=this.selectedFileName;
    this.employeeService.saveEmployees(employee).subscribe({
      next: data => {
        this.handleSearchemployees();
        alert("Employee has been successfully saved");
        this.newEmployeeFormGroup.reset();


      },
      // error: err => {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Employee CREATION FAILED',
      //     text: 'Please enter a valid email address.',
      //   });
      //   console.log(err);
      //
      // }
    });
  }


  downloadBadge(imageBase64: string,employeeName: string, qrCodeBase64: string) {
    const badgeContainer = document.createElement('div');
    badgeContainer.style.width = '250px';
    badgeContainer.style.height = '400px';
    badgeContainer.style.border = '2px solid #007bff';
    badgeContainer.style.borderRadius = '10px';
    badgeContainer.style.textAlign = 'center';
    badgeContainer.style.padding = '20px';
    badgeContainer.style.backgroundColor = '#f9f9f9';
    badgeContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    badgeContainer.style.position = 'relative';
    badgeContainer.style.fontFamily = '"Arial", sans-serif';
    badgeContainer.style.color = '#333';

    // Create an image element for the employee's photo
    const photoElement = document.createElement('img');
    photoElement.src = imageBase64;
    photoElement.style.width = '120px';
    photoElement.style.height = '120px';
    photoElement.style.borderRadius = '50%';
    photoElement.style.border = '2px solid #007bff';
    photoElement.style.marginBottom = '10px';

    // Create an element for the employee's name
    const nameElement = document.createElement('div');
    nameElement.innerText = employeeName;
    nameElement.style.fontSize = '24px';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.marginBottom = '10px';
    nameElement.style.color = '#007bff';

    // Create an image element for the QR code
    const qrCodeElement = document.createElement('img');
    qrCodeElement.src = 'data:image/png;base64,' + qrCodeBase64;
    qrCodeElement.style.width = '120px';
    qrCodeElement.style.height = '120px';
    qrCodeElement.style.border = '2px solid #007bff';
    qrCodeElement.style.borderRadius = '10px';
    qrCodeElement.style.marginTop = '10px';

    // Create a div for the badge ID
    const idElement = document.createElement('div');
    idElement.innerText = 'ID: 123456';
    idElement.style.fontSize = '16px';
    idElement.style.marginTop = '15px';
    idElement.style.color = '#555';

    // Append photo, name, QR code, and ID elements to the badge container
    badgeContainer.appendChild(nameElement);
    badgeContainer.appendChild(photoElement);


    badgeContainer.appendChild(qrCodeElement);
    badgeContainer.appendChild(idElement);

    document.body.appendChild(badgeContainer); // Append to the body to avoid iframe issues

    // Use html2canvas to generate the image
    html2canvas(badgeContainer, {useCORS: true}).then(canvas => {
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${employeeName}-badge.png`;
      link.click();
      document.body.removeChild(badgeContainer); // Clean up the DOM
    }).catch(error => {
      console.error("html2canvas error:", error);
      document.body.removeChild(badgeContainer); // Clean up the DOM
    });
  }



  injector = inject(AuthService);







}
