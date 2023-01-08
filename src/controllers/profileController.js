userController.getUser({id_user: userSession.id_user}).then(
    function(response) {setProfileValues(response[0])}
  )

  function setProfileValues(user){
    reviewController.getAvg({id_reviewedUser: user.id_user}).then(
      function(response) {
        var name = document.getElementById("name");
        var description = document.getElementById("description");
        var ability = document.getElementById("ability");
        var karma = document.getElementById("karma");
        name.innerHTML  = user.name;
        description.innerHTML  = user.description;
        ability.innerHTML  = (response[0].abilityScore === undefined ) ? 0 : Math.round(response[0].abilityScore);
        karma.innerHTML  = (response[0].karmaScore === undefined ) ? 0 : Math.round(response[0].karmaScore);
      }
    )
} 