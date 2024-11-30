
USE cse316_assignment5;

-- Those are dummy values, and will not be used once the front-end is ready.
INSERT INTO users (userName, userPasswd, userEmail) VALUES ("Marlow58", "134340", "marlow58@pseudoartist.com");
INSERT INTO users (userName, userPasswd, userEmail) VALUES ("Producer.P", "136199", "producer.p@pseudoartist.com");
INSERT INTO users (userName, userPasswd, userEmail) VALUES ("Andy-kun", "136472", "andykun@pseudoartist.com");
INSERT INTO users (userName, userPasswd, userEmail) VALUES ("Stoxch", "225088", "stoxch@pseudoartist.com");

INSERT INTO worlds (worldName, worldStory, worldCreator) VALUES ("The Pseudoartist Clan", "A bilingual pseudo-artist who loves computers", 2);
INSERT INTO worlds (worldName, worldStory, worldCreator) VALUES ("Midnight Tuners", "Enjoy high-speed tuned vehicles!", 1);

INSERT INTO characters (characterName, characterStory, characterWorld, characterCreator) VALUES ("Kyuha","A wannabe hacker", 1, 1);
INSERT INTO characters (characterName, characterStory, characterWorld, characterCreator) VALUES ("Alyss","Not Megumin", 1, 4);
INSERT INTO characters (characterName, characterStory, characterWorld, characterCreator) VALUES ("Producer.P's Porsche 911","Dream car", 2, 2);
INSERT INTO characters (characterName, characterStory, characterWorld, characterCreator) VALUES ("Andy-kun's Toyota Soarer","Tuner car", 2, 3);
INSERT INTO characters (characterName, characterStory, characterWorld, characterCreator) VALUES ("Stoxch's Mercedes CLK500","Exotic car", 2, 4);

INSERT INTO messages (messageType, messageTitle, messageSenderId, messageContent) VALUES (false, "Hello World!", 1, "This is the first message for CardHouse!");
INSERT INTO messages (messageType, messageTitle, messageSenderId, messageContent) VALUES (true, "Hello World!", 1, "This is the first message for CardHouse for Pseudoartist Clan!");
INSERT INTO messages (messageType, messageTitle, messageSenderId, messageContent) VALUES (false, "Andy's Post", 3, "Good to see you!");
INSERT INTO messages (messageType, messageTitle, messageSenderId, messageContent) VALUES (true, "Got a new car", 4, "You see, I would love a 2JZ but a Supra was out of my budget...");
INSERT INTO messages (messageType, messageTitle, messageReplyId, messageSenderId, messageContent) VALUES (true, "2JZ is overpriced", 4, 3, "Funny how a Supra is more expensive than a brand new Porsche ><");
INSERT INTO messages (messageType, messageTitle, messageReplyId, messageSenderId, messageContent) VALUES (true, "Cheap Convertible", 4, 5, "You see, I got this car for under $5000");