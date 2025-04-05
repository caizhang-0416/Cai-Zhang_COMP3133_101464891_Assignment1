const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

module.exports = {
  signup: async ({ username, email, password }) => {
    const user = new User({ username, email, password });
    await user.save();
    return user;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { userId: user.id, token };
  },

  getAllEmployees: async () => await Employee.find(),

  searchEmployeeById: async ({ id }) => await Employee.findById(id),

  searchEmployeeByDesignation: async ({ department, designation }) => {
    let filter = {};
    if (department) filter.department = department;
    if (designation) filter.designation = designation;
    return await Employee.find(filter);
  },

  addEmployee: async (args) => {
    const employee = new Employee(args);
    await employee.save();
    return employee;
  },

  updateEmployee: async ({ id, ...args }) => {
    return await Employee.findByIdAndUpdate(id, args, { new: true });
  },

  deleteEmployee: async ({ id }) => {
    await Employee.findByIdAndDelete(id);
    return "Employee deleted successfully";
  }
};
