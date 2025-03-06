export class Customer {
    private firstName: string;
    private lastName: string;
    private _age: number;  // Private property for age

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;  // Set age through the constructor
    }

    // Method to greet the customer
    public greeter(): void {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }

    // Method to get and log the customer's age
    public GetAge(): void {
        console.log(`${this.firstName} ${this.lastName} is ${this._age} years old.`);
    }
}
