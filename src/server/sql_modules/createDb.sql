DROP DATABASE IF EXISTS cse316_assignment5;

CREATE DATABASE cse316_assignment5;
USE cse316_assignment5;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS worlds;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
	userId INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(64),
	userPasswd VARCHAR(256),
	userIcon VARCHAR(256) DEFAULT "src/server/placeholder/user.png",
	userEmail VARCHAR(256)
  );
  
CREATE TABLE worlds (
	worldId INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	worldName VARCHAR(256),
	worldIcon VARCHAR(256) DEFAULT "src/server/placeholder/world.png",
	worldStory VARCHAR(512),
	worldCreator INTEGER UNSIGNED
);
  
CREATE TABLE characters (
	characterId INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	characterName VARCHAR(256),
	characterIcon VARCHAR(256) DEFAULT "src/server/placeholder/user.png",
	characterStory VARCHAR(512),
	characterWorld INTEGER UNSIGNED,
	characterCreator INTEGER UNSIGNED
);

CREATE TABLE messages (
	messageId INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	messageType BOOLEAN,
	messageTitle VARCHAR(64),
	messageReplyId INTEGER UNSIGNED DEFAULT 0,
	messageSenderId INTEGER UNSIGNED,
	messageContent VARCHAR(512)
);
