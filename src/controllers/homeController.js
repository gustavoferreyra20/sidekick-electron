var arrOptions = [];

postController.getAllPosts().then(
    function(response) {postController.loadPosts(response)}
  )


  async function setPlatforms(){
    await platformController.getOptions(null, true);  
  }

  async function setModes(){
    await modeController.getOptions(true);  
  }

  setPlatforms();
  setModes();