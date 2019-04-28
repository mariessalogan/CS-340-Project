module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getClass(res, mysql, context, complete){
        mysql.pool.query("SELECT `Class_id`, `name`, `Pro`, `Con`, `Main_Weapon` FROM `class`;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes  = results;
            complete();
        });
    }
    function getOneClass(res, mysql, context, id, complete){
        var sql = "SELECT `Class_id`, `name`, `Pro`, `Con`, `Main_Weapon` FROM `class` WHERE Class_id = ?";
        var inserts = [Class_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else {
                context.class = results[0];
                complete(context);
            }
        });
    }
     
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


    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js", "selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getClass(res, mysql, context, complete);
        getWeapons(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('Class', context);
            }

        }
    });

    /* Display one person for the specific purpose of updating people TO BE UPDATED LATER */

   router.get('/:Class_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js", "deleteperson.js"];
        var mysql = req.app.get('mysql');
        getOneClass(res, mysql, context, req.params.Class_id, complete);
        getRace(res, mysql, context, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-class', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO class (name, Pro, Con, Main_Weapon) VALUES (?, ?, ?, ?);";
        var inserts = [req.body.name, req.body.Pro, req.body.Con, req.body.Main_Weapon];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Class');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person THIS WILL BE UPDATED LATER */

    router.put('/:Class_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE class SET name=?, Pro=?, Con=? WHERE id=?";
        var inserts = [req.body.name, req.body.Pro, req.body.Con, req.params.id];
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

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `class` WHERE id = ?";
        var inserts = [req.params.id];
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