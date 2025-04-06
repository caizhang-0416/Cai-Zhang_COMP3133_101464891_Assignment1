const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  scalar Upload
  
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }
  
input EmployeeInput {
  first_name: String!
  last_name: String!
  email: String!
  gender: String!
  designation: String!
  salary: Float!
  date_of_joining: String!
  department: String!
  employee_photo: String
}

  type AuthData {
    userId: ID!
    username: String!
    token: String!
  }

  type Query {
    login(email: String!, password: String!): AuthData
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
    searchEmployeeByDesignation(department: String, designation: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(employee: EmployeeInput!, employee_photo: Upload): Employee
    updateEmployee(id: ID!, employee: EmployeeInput!, employee_photo: Upload): Employee
    deleteEmployee(id: ID!): String
  }
`);
