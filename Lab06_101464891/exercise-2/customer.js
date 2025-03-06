var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    return Customer;
}());
// Create an instance of the Customer class
var customer = new Customer();
customer.firstName = "John";
customer.lastName = "Smith";
// Call the greeter method
customer.greeter();
