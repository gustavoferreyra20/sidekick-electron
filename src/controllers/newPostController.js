async function setPlatforms(game){
    platformController.getOptions(game.value);  
  }

  async function setModes(){
    modeController.getOptions(true);  
  }
  
  async function setGames(){
    gameController.getOptions(true);  
  }
  async function savePost(post){
    postController.savePost(post)
  }
  
  setModes();
  setGames();