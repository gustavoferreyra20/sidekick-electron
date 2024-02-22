function capitalizeFirstLetter(str) {

  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

function calculateTimeElapsed(createdat) {
  var currentDate = new Date();
  var receivedDate = new Date(createdat);

  var timeDiff = Math.abs(currentDate.getTime() - receivedDate.getTime());
  var minutes = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes
  var hours = Math.floor(minutes / 60); // Convert minutes to hours

  if (minutes < 60) {
    return minutes + ' minutos atrás'; // Less than an hour ago
  } else if (hours < 24) {
    return hours + ' horas atrás'; // Less than a day ago
  } else {
    // Format full date in Spanish (e.g., "2 de enero de 2024")
    return receivedDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

module.exports = {
  capitalizeFirstLetter,
  calculateTimeElapsed
};