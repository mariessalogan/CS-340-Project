module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getRace(res, mysql, context, complete){
        mysql.pool.query("SELECT `Race_id`, `name`, `Pro`, `Con` FROM `race`;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.races  = results;
            complete();
        });
    }
     
  function getOneRace(res, mysql, context, id, complete){
        var sql = "SELECT `Race_id`, `name`, `Pro`, `Con` FROM `class` WHERE Race_id = ?";
        var inserts = [Race_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else {
                context.race = results[0];
                complete(context);
            }
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js", "updateperson.js", "selectedplanet.js"];
        var mysql = req.app.get('mysql');
        getRace(res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('Race', context);
            }

        }
    });

    /* Display one person for the specific purpose of updating people TO BE UPDATED LATER */

   router.get('/:Race_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getRace(res, mysql, context, complete);
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-race', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO race (name, Pro, Con) VALUES (?, ?, ?);";
        var inserts = [req.body.name, req.body.Pro, req.body.Con];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Race');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person THIS WILL BE UPDATED LATER */

    router.put('/:Race_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE race SET name=?, Pro=?, Con=? WHERE id=?";
        var inserts = [req.body.name, req.body.Pro, req.body.Con, req.params.Race_id];
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

    router.delete('/:Race_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `race` WHERE id = ?";
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