import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {map, Observable} from 'rxjs';
import {Employee} from '../models/employee.model';

interface EmployeeInput {
  first_name: string
  last_name: string
  email: string
  gender: string
  designation: string
  salary: number
  date_of_joining: string
  department: string
  employee_photo: string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.apollo.query({
      query: gql`
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      fetchPolicy: 'network-only'
    }).pipe(map((response: any) => response.data.getAllEmployees));
  }

  searchEmployeeById(id: string) {
    return this.apollo.query({
      query: gql`
        query($id: ID!) {
          searchEmployeeById(id: $id) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: { id }
    }).pipe(map((response: any) => response.data.searchEmployeeById));
  }

  searchEmployees(department: string, designation: string): Observable<Employee[]> {
    return this.apollo.query({
      query: gql`
        query($department: String, $designation: String) {
          searchEmployeeByDesignation(department: $department, designation: $designation) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: { department, designation }
    }).pipe(map((response: any) => response.data.searchEmployeeByDesignation));
  }

  addEmployee(employee: any, employee_photo: any) {
    employee.salary = parseFloat(employee.salary);
    return this.apollo.mutate({
      mutation: gql`
      mutation($employee: EmployeeInput!, $employee_photo: Upload) {
        addEmployee(employee: $employee, employee_photo: $employee_photo) {
          _id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `,
      variables: { employee, employee_photo },
      context: {
        useMultipart: true,
      }
    }).pipe(map((response: any) => response.data.addEmployee));
  }
  updateEmployee(id: string, employee: any, employee_photo: any) {
    employee.salary = parseFloat(employee.salary);
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!, $employee: EmployeeInput!, $employee_photo: Upload) {
          updateEmployee(id: $id, employee: $employee, employee_photo: $employee_photo) {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `,
      variables: { id, employee, employee_photo }
    }).pipe(map((response: any) => response.data.updateEmployee));
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    });
  }
}
