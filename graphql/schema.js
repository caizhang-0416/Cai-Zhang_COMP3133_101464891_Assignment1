const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    id: ID!
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

  type AuthData {
    userId: ID!
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
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!): Employee
    updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, department: String): Employee
    deleteEmployee(id: ID!): String
  }
`);
