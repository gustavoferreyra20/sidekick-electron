var arrOptions = [];

async function getPosts (args = null){
    return new Promise((resolve, reject) =>{
    const params = new URLSearchParams(args)
    var url = process.env.SIDEKICK_API + 'posts';

    if(args !== null){
      url = url + '/bo?' + params;
    }

    axios.get(url)
    .then((res) => {
      resolve(res.data);
    })
    })
    
  }
  
  async function loadPosts (posts){
    for (var i=0, n = posts.length; i < n; i++) { // looping over the options

      user = await userController.getUser({id_user: posts[i].id_user});
      reviewStats = await reviewController.getAvg({id_user: user[0].id_user});
      posts[i].abilityScore = (reviewStats[0].abilityScore === undefined ) ? 0 : Math.round(reviewStats[0].abilityScore);
      posts[i].karmaScore = (reviewStats[0].karmaScore === undefined ) ? 0 : Math.round(reviewStats[0].karmaScore);
      game = await gameController.getGame({id_game: posts[i].id_game});
      platform = await platformController.getPlatforms({id_platform: posts[i].id_platform});
      mode = await modeController.getModes({id_mode: posts[i].id_mode});

      posts[i].userName = user[0].name;
      posts[i].mode = utils.capitalizeFirstLetter(mode[0].name);
      posts[i].platform = platform[0].name;
      posts[i].gameName = game[0].name;
      posts[i].gameImg = game[0].img;
      } 
    return posts;
  
  }

  async function savePost(post){
      const url = process.env.SIDEKICK_API + 'posts';
      let data = {
        id_user: userSession.id_user,
        id_game: post.game.value,
        id_platform:  post.platform.value,
        id_mode:  post.mode.value,
        requiredUsers: post.userRequire,
        actualUsers: 0,
        title:  post.title,
        description: (post.description != null) ? post.description : ''
      }

      axios.post(url, data)
      .then(() => {
        popupController.action("Anuncio creado con exito", function (){ (location.reload())})
      })
      .catch(function(error) {
        console.log(error);
      }); 
  }

  async function removePost(id_post){
    const url = process.env.SIDEKICK_API + 'posts/bo?id_post='+ id_post;
    await axios.delete(url)
    .catch(function(error) {
      console.log(error);
    });; 
  }

async function getApplications(args){
  return new Promise((resolve, reject) =>{
    var url = process.env.SIDEKICK_API + 'posts/join?';
    const params = new URLSearchParams(args)

    axios.get(url + params)
    .then((res) => {
      resolve(res.data)
    })
    .catch(function(error) {
      console.log(error);
    });
  })
}

async function saveApplication(data){
  const url = process.env.SIDEKICK_API + 'posts/join';

  axios.post(url, data)
  .then(() => {
    popupController.alert("Solicitud enviada");
  })
  .catch(function(error) {
    console.log(error);
  }); 
}

async function removeApplication(id_post, id_user){
  const url = process.env.SIDEKICK_API + 'posts/join?id_post='+ id_post + '&id_user='+ id_user;
  await axios.delete(url)
  .catch(function(error) {
    console.log(error);
  });; 
}

async function addApplication(args){
  const url = process.env.SIDEKICK_API + 'posts/join?';
  const params = new URLSearchParams(args)

  await axios.put(url + params)
  .catch(function(error) {
    console.log(error);
  }); 
}

  module.exports = {
    getPosts,
    loadPosts,
    savePost,
    removePost ,
    getApplications,
    saveApplication,
    removeApplication,
    addApplication 
  };