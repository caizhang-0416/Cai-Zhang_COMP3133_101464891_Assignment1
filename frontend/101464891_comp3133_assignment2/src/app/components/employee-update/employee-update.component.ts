import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {DEFAULT_EMPLOYEE_PHOTO} from '../../constants';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId!: string;
  fileName: string = '';
  employeePhoto: File | null = null;
  employeePhotoUrl: string = DEFAULT_EMPLOYEE_PHOTO;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.searchEmployeeById(this.employeeId).subscribe((employee: Employee) => {
      this.employeePhotoUrl = employee.employee_photo || DEFAULT_EMPLOYEE_PHOTO;
      const tempEmployee = {
        ...employee,
        date_of_joining: new Date(parseInt(employee.date_of_joining))
      }
      this.employeeForm.patchValue(tempEmployee);
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value, this.employeePhoto).subscribe({
      next: () => {
        console.log('Employee updated successfully');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        this.errorMessage = `Error adding employee: ${error.message}. Please try again.`;
      }});
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
