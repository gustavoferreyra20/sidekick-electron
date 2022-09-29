const { getConnection } = require("../database");
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.getItems = async function (items){
  const url = process.env.SIDEKICK_API + items;
  return new Promise((resolve, reject) => {
    resolve(fetch(url).then(res => res.text()) )
  }) 


  }

  exports.loadGames = async function (games){
    var arrOptions = [];
    var games = JSON.parse(games);
    for (var i=0, n = games.length; i < n; i++) { // looping over the options
      arrOptions.push("<img src='" + games[i].img + "' class=img-fluid alt='" + games[i].nombre + "'>");
      document.getElementById("games").innerHTML = arrOptions.join('');
  }
  }

  exports.loadPosts = async function (posts){
    var posts = JSON.parse(posts);
    var arrOptions = [];
    var html;
    var user;
    for (var i=0, n = posts.length; i < n; i++) { // looping over the options
    let conditions = {
      id_user: posts[i].id_user
    }
    user = await userController.getUser(conditions)
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
        <div class="col-sm-12  col-lg-2 btn btn-post ml-auto">Unirse</div>
    </div>
    <div class="line"></div>
    <div class="row ml-auto">
        <img id="game" class="img-responsive rounded product-image" src="../img/games/MultiVersus.jpg">
        <p class="col">` + posts[i].description +`</p>
    </div>
    </div>
      `;
      arrOptions.push(html);
      document.getElementById("ads").innerHTML = arrOptions.join('');
  } 
  return new Promise((resolve, reject) => {
    resolve(arrOptions)
  }) 
  }

