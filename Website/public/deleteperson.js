function deletePerson(id){
    $.ajax({
        url: '/Character/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteWeapon(Weapon_id){
    console.log("deleteweapon function");
    $.ajax({
        url: '/Weapons/' + Weapon_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
            console.log("deleteweapon function success");
        }
    })
  };

function deleteRace(Race_id){
    $.ajax({
        url: '/Race/' + Race_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
  };

 function deleteClass(Class_id){
    $.ajax({
        url: '/Class/' + Class_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
  };