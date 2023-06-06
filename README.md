[![License:MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# SeriesOne-EmployeeTracker


## Description
This application is a backend solution for managing a company's employees using node.js, inquirer, and MySQL. The interface functions as a Content Management System (CMS) for non-developers to easily view and interact with information stored in the database from the terminal.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [License](#license)
- [Credits](#credits)
- [Contact / Questions](#contact--questions)


## Installation
A. Just to run the application: 
1. Clone the repo down onto your local machine
2. Open the project and make sure your terminal is in the project folder
3. Run an npm i in the CLI to ensure you have the necessary packages installed 

B. To make any edits on the backend before initializing: 
1. Log in to MySQL by using the command: mysql -u root -p
    - When prompted, enter your password for MySQL
2. SHOW DATABASES; --> will show all of your MySQL databases; USE employees_db (this database)
3. While in MySQL, you can edit the seeds.sql file to quickly personalize your app insead of deleting the dummy data while in the app
4. Be sure to use the command: source db/schema.sql and source db/seeds.sql to update your changes before running the app


## Usage (Instructions/How-To Use)
To use this application, go through the necessary installation requirements (installation procees A, listed above, is required). Once completed, use the terminal to initialize the application; command: npm start (or node server).  
Follow the prompts and when finsihed, choose the exit option to quit the app. 

## Demo
Full Demo: <a href="https://vimeo.com/810746221">Video</a>

<!-- in the parentheses is just the relative path to the screenshot-->
![Demo GIF](./assets/FullDemoVid.gif)


## Screenshots
Intro Prompt: ![Screenshot 1](./assets/screenshot1.png)  
  
View all Departments, Roles, Employees: ![Screenshot 2](./assets/screenshot2.png)  

Add new Department, Role, Employee: ![Screenshot 3](/assets/screenshot3.png)  

Update Employee Role, Delete Employee, End: ![Screenshot 4](./assets/screenshot5.png)


## Technologies
JavaScript, Node.js, MySQL


## License
This project is licensed under the MIT license. For more information about this license and what it entails, visit the MIT website <a href="https://opensource.org/licenses/MIT">here</a>


## Credits
Blair Millet and Christina Hall. 

## Contact / Questions
  If you liked this project and want to see more, feel free to check out my other repos [here](https://github.com/tlequernaque).  
  For any questions or inquiries, you can reach me at t.lequernaque@yahoo.com for further information.