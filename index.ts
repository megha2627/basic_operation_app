// Import readline module from Node.js to take input from user
import readline from 'readline';
import { User } from './models/User';


// Define the structure of a User using a TypeScript interface


// Create an empty array to store users
let users: User[] = [];

// Create a readline interface to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu options
function showMenu() {
    console.log(`
        ==== User Management System ====
        1. Create User
        2. View All Users
        3. Update User
        4. Delete User
        5. Exit
    `);

    rl.question('Select an option: ', (option) => {
        handleMenu(option);
    });
}

// Function to handle user selection
function handleMenu(option: string) {
    switch (option) {
        case '1':
            createUser();
            break;
        case '2':
            viewUsers();
            break;
        case '3':
            updateUser();
            break;
        case '4':
            deleteUser();
            break;
        case '5':
            rl.close();
            console.log('Goodbye!');
            break;
        default:
            console.log('Invalid option. Try again.');
            showMenu();
    }
}

// Function to create a new user
function createUser() {
    rl.question('Enter name: ', (name) => {
        rl.question('Enter email: ', (email) => {
            const newUser: User = {
                id: users.length + 1, // auto-increment id
                name,
                email
            };
            users.push(newUser);
            console.log('User created successfully!');
            showMenu();
        });
    });
}

// Function to view all users
function viewUsers() {
    console.log('--- All Users ---');
    users.forEach((user) => {
        console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
    showMenu();
}

// Function to update a user
function updateUser() {
    rl.question('Enter user ID to update: ', (id) => {
        const userId = parseInt(id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            console.log('User not found.');
            showMenu();
            return;
        }

        rl.question('Enter new name: ', (name) => {
            rl.question('Enter new email: ', (email) => {
                user.name = name;
                user.email = email;
                console.log('User updated successfully!');
                showMenu();
            });
        });
    });
}

// Function to delete a user
function deleteUser() {
    rl.question('Enter user ID to delete: ', (id) => {
        const userId = parseInt(id);
        users = users.filter(u => u.id !== userId);
        console.log('User deleted successfully (if ID existed)!');
        showMenu();
    });
}

// Start the app by showing the menu
showMenu();
