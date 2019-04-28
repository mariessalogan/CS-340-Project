module.exports = function(){
    var express = require('express');
    var router = express.Router();
    console.log("Hey world");

    function getRace(res, mysql, context, complete){
        mysql.pool.query("SELECT `Race_id`, `name` FROM `race`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                context.races  = results;
                complete(context);
            }
        });
    }
     function getClass(res, mysql, context, complete){
        mysql.pool.query("SELECT `Class_id`, `name` FROM `class`", function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                context.classes  = results;
                complete(context);
            }

        });
    }


    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT `c`.`id`, `c`.`name`, `class`.`name` AS `CLASS`, `race`.`name` AS `RACE`, `c`.`enemy`, `c`.`alignment` FROM `character` `c` INNER JOIN `TRAINS` on `TRAINS`.`CID` = `c`.`id` INNER JOIN `IS` ON `IS`.`CID` = `c`.`id` INNER JOIN `class` ON `class`.`Class_id` = `TRAINS`.`ClID` INNER JOIN `race` ON `race`.`Race_id` = `IS`.`RID` WHERE `TRAINS`.`ClID` = `class`.`Class_id`OR `IS`.RID = `race`.`Race_id`;", function(error, results, fields){
            if(error){
                //console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                context.people = results;
                console.log(context);
                complete(context);
            }
        });
    }

    function getPerson(res, mysql, context, id, complete){
        var sql = "SELECT `c`.`id`, `c`.`name`, `class`.`name` AS `CLASS`, `race`.`name` AS `RACE`, `c`.`enemy`, `c`.`alignment` FROM `character` `c` INNER JOIN `TRAINS` on `TRAINS`.`CID` = `c`.`id` INNER JOIN `IS` ON `IS`.`CID` = `c`.`id` INNER JOIN `class` ON `class`.`Class_id` = `TRAINS`.`ClID` INNER JOIN `race` ON `race`.`Race_id` = `IS`.`RID` WHERE c.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else {
                context.person = results[0];
                complete(context);
            }
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        console.log("initialized");
        context.jsscripts = ["deleteperson.js", "selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
               getPeople(res, mysql, context, function (context) {
            getClass(res, mysql, context, function (context) {
                getRace(res, mysql, context, function (context) {
                    console.log(context);
                    callbackCount++;
                    if (callbackCount >= 1) {
                        res.render('Character', context);
                    }
                });
            });
        });
    });

   
    /* Display one person for the specific purpose of updating people TO BE UPDATED LATER */

   router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js", "deleteperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getRace(res, mysql, context, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-person', context);
            }

        }
    });

   
    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO character c (c.name, c.enemy, c.alignment) VALUES (?, ?, ?)";
        var inserts = [req.body.name, req.body.enemy, req.body.alignment];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            console.log(inserts);
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                console.log(results);
                res.redirect('/Character');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person  */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE character SET name=?, enemy=?, alignment=? WHERE id=?";
        var inserts = [req.body.name, req.body.enemy, req.body.alignment, req.params.id];
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
        var sql = "DELETE FROM `character` WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{

                res.status(202).end();
            }
            console.log("delete run");
        })
    })

    return router;
}();