CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(50),
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);