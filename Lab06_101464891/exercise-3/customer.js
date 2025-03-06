var Customer = /** @class */ (function () {
    function Customer(firstName, lastName) {
        this.firstName = firstName; // Assign values correctly
        this.lastName = lastName;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    return Customer;
}());
// Create an instance of the Customer class
var customer = new Customer("John", "Smith");
// Call the greeter method
customer.greeter();
