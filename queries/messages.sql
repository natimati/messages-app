CREATE TABLE vpaa1dxuob39guw3.messages (
	id varchar(100) NOT NULL,
	senderId varchar(100) NOT NULL,
	recipientId varchar(100) NOT NULL,
	createdAt DATETIME NOT NULL,
	title TEXT NOT NULL,
	messageBody TEXT NOT NULL,
	CONSTRAINT messages_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_polish_ci;
CREATE FULLTEXT INDEX messages_recipientId_IDX ON vpaa1dxuob39guw3.messages (recipientId);
