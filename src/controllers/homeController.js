var arrOptions = [];

  async function searchPost(post){
    let params = '';

    if(post.game.value != 'any'){
      params = params + 'id_game=' + post.game.value + '&';
    }

    if(post.platform.value != 'any'){
      params = params + 'id_platform='+ post.platform.value + '&';
    }

    if(post.mode.value != 'any'){
      params = params + 'id_mode='+ post.mode.value;
    }

    postController.getPosts(params).then(
      function(response) {postController.loadPosts(response)}
    )
  }

  async function newApplication(id_post, id_userApplicant){
    event.preventDefault();
    let data = {
      id_post: id_post,
      id_userApplicant: id_userApplicant
    }
    
    applicationController.saveApplication(data);
  }
  
  setModes();
  setGames();