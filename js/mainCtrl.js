/*
  But :    Contrôleur du Dashboard contenant toutes les informations sur l'espace
  Auteur : Nicolas Schmid
  Date :   06.06.2024 / V1.2
*/

class MainCtrl {

  // Constructeur
  constructor() {

    // Log de bienvenue
    indexCtrl.addLogMessage("Page chargée avec succès !", true);

    // Ajouter la référence au httpService
    window.httpService.mainCtrl = this;
    this.maxLog = 6;

    // Ajouter le évènements de boutons
    this.addEventListener();

    // Mettre à jour les infos du jour
    this.updateSunTZ();

    // Initialiser la carte et récupérer l'ISS
    window.issMarker = null;
    window.mapISS = this.initMap();
    this.updateISSLocation();

    // Interval mettant à jour l'heure actuelle
    this.updateClockInterval = setInterval(this.updateClock, 50);

  }

  // Méthode de nettoyage avant suppression
  cleanup() {
    // Supprimer l'intervale d'horloge
    if (this.updateClockInterval) {
      clearInterval(this.updateClockInterval);
      this.updateClockInterval = null;
    }
  }

  // Fonction pour rajouter les évènements d'écoute
  addEventListener() {
    $("#btn_updateISS").click(() => this.updateISSLocation());
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
    if ($("#logArray").children().length > this.maxLog) {
      $("#logArray").children().last().remove();
    }

  }

  // Fonction pour mettre à jour les info du soleil / lune et timezone
  updateSunTZ() {
    // Variables
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    httpService.getSunData(function (data) {
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
      $("#dayLength").text(daylength);
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

    indexCtrl.addLogMessage("Carte chargée !", true);

    return map;
  }

  // Fonction pour rafraîchir la location de l'ISS
  updateISSLocation() {
    httpService.updateISSLocation(function (data) {
      // Récupérer les valeurs importantes
      let lat = data.latitude;
      let lng = data.longitude;

      // Icône du marqueur ISS
      let issIcon = L.icon({
        iconUrl: "img/iss.png",
        iconSize: [18, 30],
        iconAnchor: [9, 30],
        popupAnchor: [0, -20],
      });


      // Supprimer le marqueur si existant
      if (issMarker != null) {
        window.mapISS.removeLayer(issMarker);
      }

      // Marqueur ISS
      issMarker = new L.Marker([lat, lng], {
        icon: issIcon
      });

      // Ajouter le marqueur
      issMarker.addTo(window.mapISS);
      window.mapISS.setView([lat, lng], 4);

      // Informations du marqueur
      issMarker.bindPopup("Latitude: " + lat + " Longitude: " + lng, {
        closeButton: true,
        autoClose: false,
        closeOnClick: true
      }).openPopup();


    });
  }

  // Fonction pour mettre à jour le temps
  updateClock() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let millisecond = now.getMilliseconds();
    $("#preciseClock").text("[" + day + "." + month + "." + year + "] [" + hour + "h " + minute + "m " + second + "s " + millisecond + "ms]");
  }
}