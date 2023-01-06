async function setPlatforms(game){
    await platformController.getOptions(game.value);  
  }

  async function setModes(){
    await modeController.getOptions(true);  
  }
  
  gameController.getAllGames().then(
    function(response) {gameController.getOptionsByGame(response)}
  )

  async function savePost(post){
    postController.savePost(post)
  }
  
  setModes();