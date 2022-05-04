CREATE TABLE vehicles (
	plate VARCHAR (10) PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE problems (
	plate VARCHAR (10) NOT NULL,
	id VARCHAR ( 50 ) NOT NULL,
	description VARCHAR ( 1000 ) NOT NULL
);