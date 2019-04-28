--------------------
-----Characters-----
--------------------
-- get all characters and their stats for the character page
SELECT `c`.`name`, `class`.`name` AS `CLASS`, `race`.`name` AS `RACE`, `c`.`enemy`, `c`.`alignment` FROM `character` `c` 
INNER JOIN `TRAINS` on `TRAINS`.`CID` = `c`.`id`
INNER JOIN `IS` ON `IS`.`CID` = `c`.`id`
INNER JOIN `class` ON `class`.`Class id` = `TRAINS`.`ClID`
INNER JOIN `race` ON `race`.`Race id` = `IS`.`RID`
WHERE `TRAINS`.`ClID` = `class`.`Class id`OR `IS`.RID = `race`.`Race id`;

--get all characters/stats/weapons for homepage
SELECT `c`.`name`, `class`.`name` AS `CLASS`, `race`.`name` AS `RACE`, `c`.`enemy`, `c`.`alignment`,  `weapons`.`name` AS `Equipped Weapons` FROM `character` `c` 
INNER JOIN `TRAINS` on `TRAINS`.`CID` = `c`.`id`
INNER JOIN `IS` ON `IS`.`CID` = `c`.`id`
INNER JOIN `class` ON `class`.`Class id` = `TRAINS`.`ClID`
INNER JOIN `race` ON `race`.`Race id` = `IS`.`RID`
INNER JOIN `HAS` ON `HAS`.`CID` = `c`.`id`
INNER JOIN `weapons` ON `weapons`.`Weapon_id` = `HAS`.`WID`
WHERE `TRAINS`.`ClID` = `class`.`Class_id`OR `IS`.RID = `race`.`Race id`;

--Update a character
UPDATE `character` Set `:columnvaluefromdropdown` = ":inputvalue" Where `id` = :selectedfrombuttonid;


-- add a new character
INSERT INTO character (name, enemy, alignment) VALUES (:nameInput, :enemyInput, :alignmentInput)
INSERT INTO TRAINS (`CID`, `CLID`) VALUES (?, ?)
INSERT INTO IS (`CID`, `RID`) VALUES (?, ?)

-- get all character's data to populate a dropdown for associating with a weapon, class, or race  
SELECT id AS pid, name FROM `character`


-- delete a character
DELETE FROM `character` WHERE id = :character_ID_selected_from_browse_character_page

-- get all people with their current associated weapons to list
SELECT id, name 
FROM `character` 
INNER JOIN `HAS` ON `character`.`id = `HAS`.`cid` 
INNER JOIN `weapons` on `weapons`.`Weapon_id` = `HAS`.`wid`
ORDER BY name

-- get a single character's data for the Update character form
SELECT :character_ID_selected_from_browse_character_page, `TRAINS`.`ClID` AS `CLASS`, `IS`.`RID` AS `RACE` FROM `character` INNER JOIN `TRAINS` , `IS` INNER JOIN `class`, `race` WHERE `TRAINS`.`ClID` = `class`.`Class_id`OR `IS`.RID = `race`.`Race_id`;

--Search for a certain character
SELECT * FROM `character` WHERE `:option_selected_from_dropdown`= ":value_input_by_user";

--------------------
--------Class-------
--------------------

-- add a new class
INSERT INTO class (name, Main_Weapon, Pro, Con) VALUES (:nameInput, :mainweaponInputfromdropdowninput, :proInput, :ConInput)
--Search for a certain class
SELECT * FROM `class` WHERE `:option_selected_from_dropdown`= ":value_input_by_user";

--Update a class
UPDATE `class` Set `:columnvaluefromdropdown` = ":inputvalue" Where `Class_id` = :selectedfrombuttonid;
-- get all classes to populate a dropdown for associating with people
SELECT `Class_id` AS cid, name FROM `class`

-- get all Class IDs and Names to populate the Class dropdown
SELECT `Class_id`, `name` FROM `class`

--get classes for class table
SELECT `class`.`name`, `class`.`Pro`, `class`.`Con`, `weapons`.`name` AS `Main_Weapon` FROM `class`
INNER JOIN `weapons` ON `weapons`.`Weapon_id` = `class`.`Main_Weapon``

-- delete a class
DELETE FROM `class` WHERE Class_id = :class_ID_selected_from_browse_character_page


--------------------
--------Race--------
--------------------
--Show all races
SELECT `name`, `Pro`, Con FROM `race`;

--Update a Race
UPDATE `Race` Set `:columnvaluefromdropdown` = ":inputvalue" Where `Race_id` = :selectedfrombuttonid;

-- add a new race
INSERT INTO race (name, Pro, Con) VALUES (:nameInput, :proInput, :ConInput);

--Search for a certain race
SELECT * FROM `race` WHERE `:option_selected_from_dropdown`= ":value_input_by_user";

-- get all races to populate a dropdown for associating with people
SELECT `Race_id` AS rid, name FROM `race`;

-- delete a race
DELETE FROM `race` WHERE Race_id = :race_ID_selected_from_browse_character_page

--------------------
------Weapons-------
--------------------
-- add a new weapon
INSERT INTO weapons (name, `Weapon_Type`, `Damage_Dice`, `Magical`) VALUES (:nameInput, :weapontypeInput, :DamageDiceInput, :Magical_boolean_from_dropdown);


-- get all Weapons IDs and Names to populate the Weapons dropdown
SELECT `Weapon_id`, `name` FROM `weapons`

--Update a Weapon
UPDATE `weapons` Set `:columnvaluefromdropdown` = ":inputvalue" Where `Weapon_id` = :selectedfrombuttonid;

-- delete a Weapon
DELETE FROM `weapons` WHERE Weapon_id = :Weapon_ID_selected_from_browse_character_page

--Search for a certain weapon
SELECT * FROM `weapons` WHERE `:option_selected_from_dropdown`= ":value_input_by_user";








