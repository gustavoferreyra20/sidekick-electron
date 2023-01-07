var arrOptions = [];

async function getPosts (args = null){
    return new Promise((resolve, reject) =>{
    
    var url = process.env.SIDEKICK_API + 'posts';

    if(args !== null){
      url = url + '/bo?' + args;
    }
      
    axios.get(url)
    .then((res) => {
      resolve(res.data);
    })
    .catch(function(error) {
      if(error.response.status == 404){
        noPost();
      }
    });
    })
    
  }
  
  async function loadPosts (posts){

    var html;
    var user;
    for (var i=0, n = posts.length; i < n; i++) { // looping over the options

    let conditions = {
      id_user: posts[i].id_user
    }

    user = await userController.getUser(conditions);
    game = await gameController.getGame({id_game: posts[i].id_game});
    platform = await platformController.getPlatforms('id_platform=' + posts[i].id_platform);
    mode = await modeController.getModes('id_mode=' + posts[i].id_mode);
    html = `
    <div class="container-fluid mx-auto p-3 post">

      <div class="row justify-content-start px-3">

      <div class="col-sm-3 col-lg-2 col-xl-1 text-right">
            <img class="user-img fit-image" src="../img/icons/user.png">
        </div>

        <div class="col-sm-7 col-lg-8 col-xl-9 text-left">
        <div class="mt-1 mb-1 spec-1">
          <span>` + user[0].name + `</span>
          <span></span><br></span><span>` + utils.capitalizeFirstLetter(mode[0].name) + `</span><span class="dot"></span><span>` + platform[0].name + `<br></span>
        </div>
      </div>
        <div class="col-sm-2 text-right">
        <h2>` + posts[i].actualUsers + `/` + posts[i].requiredUsers + `</h2>
    
        </div>
      </div>

      <div class="line"></div>
        
      <div class="row ml-auto">
      <h2 class="col-12">` + posts[i].title + `</h2>
          <img class="img-responsive rounded product-image postGame" alt="` + game[0].name + `" src="` + game[0].img + `">
          <p class="col">` + posts[i].description + `</p>
      </div>
      <br>
      <button type="submit" class="col-sm-12  col-lg-12 btn btn-post">Unirse</button>
    </div>
      `;
      arrOptions.push(html);
      document.getElementById("ads").innerHTML = arrOptions.join('');
  } 
  arrOptions = []; 
  
  }

  async function savePost(post){
      const url = process.env.SIDEKICK_API + 'posts';
      let data = {
        id_user: userSession.id_user,
        id_game: post.game.value,
        id_platform:  post.platform.value,
        id_mode:  post.mode.value,
        requiredUsers: post.usersRequire.value,
        actualUsers: 0,
        title:  post.title.value,
        description: post.description.value
      }
  
      axios.post(url, data)
      .then(() => {
        popupController.action("Anuncio creado con exito", function (){ (location.reload())})
      })
      .catch(function(error) {
        console.log(error);
      }); 
  }
  
  function noPost(){
    html = `
    <p>
No se encontraron resultados
  <p>
    `;
    arrOptions.push(html);
    document.getElementById("ads").innerHTML = arrOptions.join('');
    arrOptions = []; 
  }
  module.exports = {
    getPosts,
    loadPosts,
    savePost  
  };