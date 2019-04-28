function updatePerson(id){
    $.ajax({
        url: '/Character/' + id,
        type: 'PUT',
        data: $('#update-person').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateWeapon(Weapon_id){
    $.ajax({
        url: '/Weapons/' + Weapon_id,
        type: 'PUT',
        data: $('#update-weapon').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateRace(Race_id){
    $.ajax({
        url: '/Race/' + Race_id,
        type: 'PUT',
        data: $('#update-race').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateClass(Class_id){
    $.ajax({
        url: '/Class/' + Class_id,
        type: 'PUT',
        data: $('#update-class').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};