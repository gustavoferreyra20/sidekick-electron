itemController.getItems('posts').then(
    function(response) {itemController.loadPosts(response)}
  )