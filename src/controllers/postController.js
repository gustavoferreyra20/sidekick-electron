var arrOptions = [];

async function getAllPosts (){
    return new Promise((resolve, reject) =>{
    
    const url = process.env.SIDEKICK_API + 'posts';
      
    axios.get(url)
    .then((res) => {
      resolve(res.data);
    })
    .catch(function(error) {
      console.log(error);
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
    game = await gameController.getGame({id_game: posts[i].id_game})
    html = `
      <div class="container-fluid py-5 mx-auto p-3 post">
      <div class="row justify-content-start px-3">
        <div class="image-bg mr-3">
            <img class="user-img fit-image" src="https://i.imgur.com/RCwPA3O.jpg">
        </div>
        <div class="col text-left">
            <h2>` + posts[i].title +`</h2>
            <div class="mt-1 mb-1 spec-1">
            <span>` + user[0].name +`</span>
              <span></span><br></span><span>Cazador de trofeos </span><span class="dot"></span><span>PS4<br></span>
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="row ml-auto">
        <img id="game" class="img-responsive rounded product-image" alt="` + game[0].name +`" src="` + game[0].img +`">
        <p class="col">` + posts[i].description +`</p>
    </div>
    <br>
    <div class="col-sm-12  col-lg-12 btn btn-post">Unirse</div>
    </div>
      `;
      arrOptions.push(html);
      document.getElementById("ads").innerHTML = arrOptions.join('');
  } 
  return new Promise((resolve, reject) => {
    resolve(arrOptions)
  }) 
  }

  async function savePost(post){
      const url = process.env.SIDEKICK_API + 'posts';
      let data = {
        id_user: userSession.id_user,
        id_game: post.games.value,
        id_platform:  post.platform.value,
        requiredUsers: post.usersRequire.value,
        actualUsers: 1,
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
  
  module.exports = {
    getAllPosts,
    loadPosts,
    savePost
  
  };