import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {Employee} from '../../models/employee.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {DEFAULT_EMPLOYEE_PHOTO} from "../../constants";
import {ConfirmDialogComponent} from '../ConfirmDialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    DatePipe,
  ],
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchDepartment: string = '';
  searchPosition: string = '';
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'gender', 'designation', 'salary',
    'date_of_joining', 'department', 'employee_photo', 'actions'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      console.log('Employees loaded:', employees);
      this.employees = employees;
    });
  }

  searchEmployees(): void {
    console.log('Searching employees with department:', this.searchDepartment, 'and position:', this.searchPosition);
    this.employeeService.searchEmployees(this.searchDepartment, this.searchPosition).subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  deleteEmployee(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          console.log('Employee with ID:', id, 'deleted successfully');
          this.loadEmployees();
        });
      }
    });
  }

  viewDetails(id: string): void {
    console.log('Viewing details for employee with ID:', id);
    this.router.navigate(['/employee', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employee/edit', id]);
  }

  addEmployee() {
    this.router.navigate(['/employee/add']);
  }

  protected readonly DEFAULT_EMPLOYEE_PHOTO = DEFAULT_EMPLOYEE_PHOTO;
}
