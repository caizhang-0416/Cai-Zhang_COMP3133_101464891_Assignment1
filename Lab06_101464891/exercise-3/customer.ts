class Customer {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName; // Assign values correctly
        this.lastName = lastName;
    }

    public greeter(): void {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

// Create an instance of the Customer class
let customer = new Customer("John", "Smith");

// Call the greeter method
customer.greeter();
