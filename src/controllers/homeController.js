itemController.getLatest('anuncio', 3).then(
  function(response) {itemController.loadAds(response)}
)
