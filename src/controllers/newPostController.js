async function setPlatforms(game){
    platformController.getOptions(game.value);  
  }

  async function setModes(){
    modeController.getOptions(false);  
  }
  
  async function setGames(){
    gameController.getOptions(false);  
  }
  async function savePost(post){
    postController.savePost(post)
  }
  
  setModes();
  setGames();