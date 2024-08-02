import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for course
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(`Balance for: ${this.name} :$${this.balance}`);
    }
    //Method to pay student fee
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`$${amount}Fee paid successfully for ${this.name}`);
        console.log(`Remaining Balance: $${this.balance}`);
    }
    // Method to display student status
    show_status() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Courses Enrolled: ${this.courses}`);
        console.log(`Balance: $${this.balance}`);
    }
}
//  Defining a student_manager class to manage student
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added successfully. Student ID:${student.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`Student ${student.name} enrolled in ${course} successfully`);
        }
    }
    // method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }
    // Method to pay student fee
    pay_students_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log("Student not found. Please enter a correct Student ID");
        }
    }
    //Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //Method to find student by Student_id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log("Welcome to Student Management System");
    console.log("-".repeat(60));
    new Student_manager();
    let student_manager = new Student_manager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fee",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        // using Switch case to handle user choice
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    },
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                student_manager.pay_students_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling a main function
main();
