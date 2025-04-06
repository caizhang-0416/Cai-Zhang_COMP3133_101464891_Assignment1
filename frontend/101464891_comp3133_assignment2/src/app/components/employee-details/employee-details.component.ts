import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import {DatePipe, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {DEFAULT_EMPLOYEE_PHOTO} from '../../constants';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  imports: [
    DatePipe,
    NgIf,
    MatCardModule,
    MatGridListModule
  ],
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  employee_photo: string = DEFAULT_EMPLOYEE_PHOTO;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadEmployeeDetails(id);
      }
    });
  }

  loadEmployeeDetails(id: string): void {
    this.employeeService.searchEmployeeById(id).subscribe((employee: Employee) => {
      this.employee = employee;
      this.employee_photo = employee.employee_photo || DEFAULT_EMPLOYEE_PHOTO;
    });
  }
}
