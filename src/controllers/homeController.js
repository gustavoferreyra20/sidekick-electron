var arrOptions = [];

postController.getPosts().then(
    function(response) {postController.loadPosts(response)}
  )


  async function setPlatforms(){
    platformController.getOptions(null, true);  
  }

  async function setModes(){
    modeController.getOptions(true);  
  }

  async function setGames(){
    gameController.getOptions(true);  
  }

  async function searchPost(post){
  }
  
  setPlatforms();
  setModes();
  setGames();