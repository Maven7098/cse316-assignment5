// MySQL was decided as most NoSQL databases are non-free
// Except Apache Cassandra, but one that I decided was not worth the tradeoff.

// We need 5 MySQL tables, consisting of the following:


/*
USERS:
userId: INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
userName: VARCHAR(64)
userPasswd: VARCHAR(256)
userIcon: VARCHAR(256)
I have yet to find a way to set image on a backend, I did use local directory for CSE316.Asm3 but that was a hack
userEmail: VARCHAR(256)
Will be used for the salt of the password as well.
A list of posts of the user.

SECONDARY (We can find it with other tables)
userWorlds - A list of worlds where the user has at least 1 character.
userWorlds obtained by finding character.characterCreator == user.userId
THEN character.characterWorld == world.worldId

Search All Worlds -> Search All Characters -> Creator === selectedUser
userCharacters:
A list of characters where the user has at least 1 character.
*/

/*
WORLDS

worldId: INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
worldName: VARCHAR(256) - world name
worldIcon: VARCHAR(256) - link to world image
worldStory: VARCHAR(512) - 
worldCreator: INTEGER UNSIGNED - creator of world (userId)

SECONDARY (We can find it with other tables)
worldMember - member of world (list of userIds)
worldMember obtained by finding character.characterWorld == world.worldId
THEN character.characterCreator == user.userId
*/

/*
CHARACTERS

characterId: INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
characterName: VARCHAR(256) - character name
characterIcon: VARCHAR(256) - link to character image
characterStory: VARCHAR(512) - Character backstory (MAX. 512 letters)
characterWorld: INTEGER UNSIGNED - World ID of the world that character belongs to
characterCreator: INTEGER UNSIGNED - User ID of the creator of character

*/

/*
MESSAGES - Posts and Messages share the same SQL table.

messageId: INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
messageType: BOOLEAN - IF TRUE call this a MESSAGE, IF FALSE call this a POST
messageTitle: VARCHAR(64)
messageReplyId: INTEGER UNSIGNED - messageId of the message this message replies to.
messageSenderId: INTEGER UNSIGNED - characterId if this is a message (in world), userId if this is a post (in user)
messageContent: VARCHAR(512) - increased limit to 512 characters

SECONDARY (We can find it with other tables)
messageWorldId - obtained by identifying the world the sender belongs to
character.characterId == message.messageSenderId WHERE messageType==1
IF messageType==0 (posts), messageWorldId=0, which is safe since worldId increments from 1.
*/

// List is a problem, but can we go around it this way?
// that is, we are circumventing the need for lists by making more tables
// User-> Bulletins - grab a list of posts whose postUserId matches selectedUser.userId
// User -> Characters - grab a list of characters whose characterCreator matches selectedUser.userId
// User -> Worlds - grab a list of 
// Worlds -> Characters
// Worlds -> 