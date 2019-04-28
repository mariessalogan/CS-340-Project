/* Name: Mariessa Logan
   Date 10/7/18
   Class: 340


This is the SQL code to create my Dungeons and Dragons Database  */


CREATE TABLE `character`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `alignment` varchar(255) DEFAULT "Neutral" NOT NULL,
    `enemy` varchar(255) DEFAULT NULL, 
    PRIMARY KEY(`id`)
    )ENGINE=INNODB;
CREATE TABLE `race`(
    `Race_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `Pro` varchar(255),
    `Con` varchar(255), 
    PRIMARY KEY(`Race id`)
    )ENGINE=INNODB;
CREATE TABLE `weapons`(
    `Weapon_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `Weapon_Type` varchar(255) NOT NULL,
    `Damage_Dice` varchar(255) NOT NULL DEFAULT "1D4", 
    `Magical` int(1) DEFAULT 0,
    PRIMARY KEY(`Weapon_id`)
    )ENGINE=INNODB;
  


/*Before I can create my class table, I have to have a weapon type already created, since there is a foreign key option.  I am creating the default “unarmed” so that can be the default option*/   
 INSERT INTO `weapons`(`name`, `Weapon_Type`) VALUES ("Unarmed", "Bludgeoning");


CREATE TABLE `class`(
    `Class_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) UNIQUE NOT NULL,
    `Pro` varchar(255),
    `Con` varchar(255),
    `Main_Weapon` int(11) DEFAULT 1,
    PRIMARY KEY(`Class_id`),
    FOREIGN KEY(`Main_Weapon`) REFERENCES `weapons`(`Weapon_id`)
    )ENGINE=INNODB;


 INSERT INTO `class`(`name`, `Main_Weapon`, `Pro`, `Con`) VALUES ("Monk", 1, "+3 to all unarmed attacks", "Unable to wear Heavy Armor");


/*These are the relationship tables for the many to many relationships.*/
CREATE TABLE `TRAINS`(
	
    `TID` int(11) AUTO_INCREMENT PRIMARY KEY,
    `CID` int(11),
    `ClID` int (11),
     FOREIGN KEY(`CID`) REFERENCES `character`(`id`)ON DELETE CASCADE,
    FOREIGN KEY(`ClID`) REFERENCES `class`(`Class_id`)ON DELETE CASCADE
    )ENGINE=INNODB;
CREATE TABLE `IS`(

    `IID` int(11) AUTO_INCREMENT PRIMARY KEY,
    `CID` int(11),
    `RID` int (11),    
    FOREIGN KEY(`CID`) REFERENCES `character`(`id`)ON DELETE CASCADE,
    FOREIGN KEY(`RID`) REFERENCES `race`(`Race_id`)ON DELETE CASCADE
    )ENGINE=INNODB;
CREATE TABLE `HAS`(
    `HID` int(11) AUTO_INCREMENT PRIMARY KEY,
    `CID` int(11),
    `WID` int (11),
    FOREIGN KEY(`CID`) REFERENCES `character`(`id`)ON DELETE CASCADE,
    FOREIGN KEY(`WID`) REFERENCES `weapons`(`Weapon_id`)ON DELETE CASCADE
    )ENGINE=INNODB;


/*We need a default Race!*/
INSERT INTO `race`(`name`, `Pro`, `Con`) VALUES ("Human", "Versatile, +1 to all skills", "Not trusted -1 to all deception checks");


/*Let’s create a character!*/
INSERT INTO `character`(`name`, `alignment`, `enemy`) VALUES ("Adrian", "Lawful Good", "Player");
INSERT INTO `TRAINS`(`CID`, `ClID`) VALUES (1,1);
INSERT INTO `HAS`(`CID`, `WID`) VALUES (1,1);
INSERT INTO `IS`(`CID`, `RID`) VALUES (1,1);


/*Want to see the character?*/
SELECT * FROM `character`;