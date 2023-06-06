-- view all departments
SELECT id AS "Department ID", dep_name AS "Department" 
FROM department

-- view all roles
SELECT roles.id AS "Role ID", roles.title AS "Job Title", department.dep_name AS "Department", salary AS "Salary"
FROM roles
INNER JOIN department ON roles.department_id = department.id
ORDER BY roles.id ASC

-- view all employees
SELECT 
    employees.id AS "Employee ID", 
    employees.first_name AS "First Name", 
    employees.last_name AS "Last Name", 
    roles.title AS "Job Title", 
    department.dep_name AS "Department", 
    roles.salary AS "Salary",
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY 
    employees.id ASC;

-- add department
INSERT INTO department (dep_name) 
VALUES ('Field Ops')

-- add role
INSERT INTO roles (title, salary, department_id) 
VALUES ('Coordinator', 75000, 2);

-- view all roles with id and title 
--> for addEmployee and updateEmployee initial query 
SELECT id, title FROM roles

-- view id, first_name and last_name from employees
-- for addEmployee, delete employee
SELECT id, first_name, last_name FROM employees ORDER BY id ASC

SELECT id, employees.first_name, employees.last_name FROM employees

SELECT employees.id, employees.first_name, employees.last_name FROM employees;

-- add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Lauren', 'Mountains', 7, 'null')

-- update employee role
UPDATE employees
SET role_id = 5
WHERE id = 9

----
-- select all employees by first name, last name 
SELECT employees.first_name AS 'First Name', 
employees.last_name AS 'Last Name' 
FROM employees

-- select title from roles table 
SELECT title AS 'Job Title' FROM roles

-- select all employees by full name 
SELECT id as "Employee ID", CONCAT(employees.first_name, " ", employees.last_name) AS "Name"
FROM employees

-- select all managers, sort by last name; add department 
SELECT CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
FROM employees
    JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY 
    manager.last_name ASC;