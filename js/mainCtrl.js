/*
  But :    Contrôleur du Dashboard contenant toutes les informations sur l'espace
  Auteur : Nicolas Schmid
  Date :   04.06.2024 / V1.0 
*/

class MainCtrl {

  // Constructeur
  constructor() {
    // Ajouter la référence au httpService
    window.httpService.mainCtrl = this;

    // Log de bienvenue
    this.addLogMessage("Page chargée avec succès !", true);

    // Mettre à jour les infos
    this.updateSunMoonTZ();

    // Initialiser la carte et récupérer l'ISS
    this.initMap();
    this.updateISSLocation();
  }

  // Fonction pour afficher un message dans les logs
  addLogMessage(msg, success) {
    // Créer les éléments du message
    let journalDiv = $('<div>', { class: 'journal' });
    let logStatusDiv;

    if (success === true) {
      logStatusDiv = $('<div>', { class: 'logStatus logSuccess', text: '✓' });
    } else {
      logStatusDiv = $('<div>', { class: 'logStatus logError', text: 'X' });
    }

    let successMessage = $('<p>', { text: msg });

    // Créer le message d'erreur
    let journal = journalDiv.append(logStatusDiv, successMessage);

    // Ajouter le message au document
    $("#logArray").prepend(journal);

    //Supprimer le plus ancien dès 5 logs
    if ($("#logArray").children().length > 5) {
      $("#logArray").children().last().remove();
    }

  }

  // Fonction pour mettre à jour les info du soleil / lune et timezone
  updateSunMoonTZ() {
    // Variables
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    httpService.getSunMoodData(function (data) {
      // Rassembler les valeurs importantes
      let timezone = data.results.timezone;
      let sunrise = httpService.formatDate(data.results.sunrise);
      let sunset = httpService.formatDate(data.results.sunset)
      let firstlight = httpService.formatDate(data.results.first_light);
      let lastlight = httpService.formatDate(data.results.last_light);
      let daylength = httpService.formatDate(data.results.day_length);

      // Renseigner les données dans les champs
      $("#timeZone").text(timezone);
      $("#sunUp").text("↑ " + sunrise);
      $("#sunDown").text("↓ " + sunset);
      $("#firstLight").text("↑ " + firstlight);
      $("#lastLight").text("↓ " + lastlight);
      $("#dayLength").text("↓ " + daylength);
    });

  }

  // Fonction pour initialiser la carte
  initMap() {
    // Position de base de la Map
    let map = L.map("map").setView([28.5220179, -80.6885489], 12);

    // Créer la Map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.addLogMessage("Carte chargée !", true);
  }

  // Fonction pour rafraîchir la location de l'ISS
  updateISSLocation() {
    httpService.updateISSLocation(function (data) {
      console.log(data);
    });
  }
}