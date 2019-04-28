module.exports = function(){
    var express = require('express');
    var router = express.Router();
    

    function getWeapons(res, mysql, context, complete){
        mysql.pool.query("SELECT `Weapon_id`, `name`, `Damage_Dice`, `Magical`, `Weapon_Type` FROM `weapons`;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.weapons  = results;
            console.log(context);
            complete();
        });
    }
     
  function getWeapon(res, mysql, context, Weapon_id, complete){
        console.log("getweapon function started");
        var sql = "SELECT `Weapon_id`, `name`, `Damage_Dice`, `Magical`, `Weapon_Type` FROM `weapons` WHERE Weapon_id=?;";
        var inserts = [Weapon_id];
        console.log("inserts initialized");
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else {
                context.weapon = results[0];
                console.log("Weapon initialized with results");
                complete(context);
            }
        });
    }

 /*   //send a GET requst to the server to delete the actual row
    var req = new XMLHttpRequest(); 
    req.open("GET", "/delete?" + "Weapon_id=" + rowId, true); 
    req.send();
    event.preventDefault();
};*/
    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js", "selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getWeapons(res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('Weapons', context);
            }

        }
    });

    /* Display one person for the specific purpose of updating people TO BE UPDATED LATER */

   router.get('/:Weapon_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getWeapon(res, mysql, context, req.params.Weapon_id, complete);
       
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-weapon', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO weapons (name, Damage_Dice, Magical, Weapon_Type) VALUES (?, ?, ?, ?);";
        var inserts = [req.body.name, req.body.Damage_Dice, req.body.Magical, req.body.Weapon_Type];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Weapons');
            }
        });
        console.log(sql);
    });

    /* The URI that update data is sent to in order to update a person THIS WILL BE UPDATED LATER */

    router.put('/:Weapon_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE weapons SET name=?, Damage_Dice=?, Magical=?, Weapon_Type=? WHERE Weapon_id=?";
        var inserts = [req.body.name, req.body.Damage_Dice, req.body.Magical, req.body.Weapon_Type, req.body.Weapon_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. THIS WILL BE UPDATED LATER*/

    router.delete('/:Weapon_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `weapons` WHERE Weapon_id = ?";
        var inserts = [req.params.Weapon_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();