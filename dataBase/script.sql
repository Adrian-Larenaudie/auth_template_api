CREATE DATABASE authapi;
USE authapi;

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
CREATE TABLE sessionToken (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- seeding
INSERT INTO role (name) VALUES ('admin'), ('user');
INSERT INTO user (name, email, password, role_id)
VALUES
    ('admin', 'admin@gmail.com', '$2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum', 1),
    ('adrian', 'adrian@gmail.com', '$2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum', 1),
    ('chloe', 'chloe@gmail.com', '$2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum', 2),
    ('mathias', 'mathias@gmail.com', '$2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum', 2),
    ('gedeon', 'gedeon@gmail.com', '$2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum', 2);
-- hash => $2b$10$HFDH8/HYPz/U6X2RxzY8vOJ6bXjVvdDZTXrNxHiePO2FxsfFvcSum => secret