DROP DATABASE IF EXISTS Employee_db;
CREATE DATABASE Employee_db;

USE Employee_db;

CREATE TABLE department (
  id INT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
  FOREIGN KEY (department_id)
  REFERENCES department(id)
--   ON DELETE SET NULL
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NOT NULL
  FOREIGN KEY (employee_id)
  REFERENCES employee(id)
--   ON DELETE SET NULL
);