CREATE TABLE vpaa1dxuob39guw3.Users (
	id varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
	createdAt DATETIME NOT NULL,
	updatedAt DATETIME NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY (id),
	CONSTRAINT Users_username_unique UNIQUE KEY (username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_polish_ci;
CREATE FULLTEXT INDEX Users_username_IDX ON vpaa1dxuob39guw3.Users (username);
