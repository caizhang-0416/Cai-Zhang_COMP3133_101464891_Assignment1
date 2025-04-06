import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DEFAULT_EMPLOYEE_PHOTO} from '../../constants';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    NgIf,
    MatDatepickerModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
  ],
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employeeForm!: FormGroup;
  fileName: string = '';
  employeePhotoUrl: string = DEFAULT_EMPLOYEE_PHOTO;
  employeePhoto: File | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['']
    });
  }

  addEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value, this.employeePhoto)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/employees']);
          },
          error: (error) => {
            console.error('Error adding employee:', error);
            this.errorMessage = `Error adding employee: ${error.message}. Please try again.`;
          }
        });
    }
  }

  onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileName = file.name;
      this.employeePhoto = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.employeePhotoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
