const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
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
    return { userId: user.id, token, username: user.username };
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
    if (args.employee_photo) {
      const { createReadStream } = await args.employee_photo.file;
      const stream = createReadStream();
      const path = `/uploads/${args.employee.first_name}_${args.employee.last_name}_${Date.now()}`;
      const writeStream = fs.createWriteStream("." + path);
      stream.pipe(writeStream);
      args.employee.employee_photo = path;
    }
    const employee = new Employee(args.employee);
    try {
      await employee.save();
    } catch (error) {
      console.error("Error saving employee:", error);
      if (args.employee.employee_photo) {
        fs.unlink("." + args.employee.employee_photo, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      throw error;
    }
    return employee;
  },

  updateEmployee: async ({ id, ...args }) => {
    if (args.employee_photo) {
      const {createReadStream} = await args.employee_photo.file;
      const stream = createReadStream();
      const path = `/uploads/${args.first_name}_${args.last_name}_${Date.now()}`;
      const writeStream = fs.createWriteStream("." + path);
      stream.pipe(writeStream);
      args.employee.employee_photo = path;
    }
    return await Employee.findByIdAndUpdate(id, args.employee, {new: true, runValidators: true});
  },

  deleteEmployee: async ({ id }) => {
    await Employee.findByIdAndDelete(id);
    return "Employee deleted successfully";
  }
};
