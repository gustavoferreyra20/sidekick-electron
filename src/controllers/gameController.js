itemController.getLatest('juego', 3).then(
  function(response) {itemController.loadGames(response)}
)