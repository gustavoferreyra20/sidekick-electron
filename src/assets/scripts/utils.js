window.onload = function() { 
  
    const navImages = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navImages.length; i++) {
          
          navImages[i].addEventListener("click", function() {
          Array.from(navImages, navImage => navImage.classList.remove('current'));
          navImages[i].classList.add('current');
          });
      }

  } 

  function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  
    return capitalized;
  }

  module.exports = {
    capitalizeFirstLetter
  };