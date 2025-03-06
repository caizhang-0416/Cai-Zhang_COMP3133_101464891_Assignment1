class Customer {
    firstName: string;
    lastName: string;

    public greeter(): void {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

// Create an instance of the Customer class
let customer = new Customer();
customer.firstName = "John";
customer.lastName = "Smith";

// Call the greeter method
customer.greeter();
