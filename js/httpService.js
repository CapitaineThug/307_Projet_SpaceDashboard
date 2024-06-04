/*
  But :    Worker exécutant les appels aux services Web
  Auteur : Nicolas Schmid
  Date :   03.06.2024 / V1.0 
*/

class HttpService {

  // Constructeur
  constructor() {

    // Créer les attributs de classe
    this.mainCtrl = null;
    this.statusCtrl = null;

  }

  // Fonction pour centraliser les erreurs HTTP
  httpErrorsSetup(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        let success = false;
        if (xhr.status === 0) {
          msg = "Pas d'accès à la ressource serveur demandée !";
        } else if (xhr.status === 404) {
          msg = "Page demandée non trouvée [404] !";
        } else if (xhr.status === 500) {
          msg = "Erreur interne sur le serveur [500] !";
        } else if (exception === "parsererror") {
          msg = "Erreur de parcours dans le JSON !";
        } else if (exception === "timeout") {
          msg = "Erreur de délai dépassé [Time out] !";
        } else if (exception === "abort") {
          msg = "Requête Ajax stoppée !";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpService.mainCtrl.addLogMessage(msg, success);
      },
    });
  }

  // Fonction pour récupérer un avatar aléatoire
  getRandomAvatar(fnSuccess) {
    // Générer la seed aléatoire
    let caracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    let seed = "";
    for (let i = 0; i < 6; i++) {
      seed += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }

    // Variables
    let url = "https://api.dicebear.com/8.x/pixel-art/svg"
    let param = "seed=" + seed;

    // envoi de la requête
    $.ajax(url, {
      type: "GET",
      dataType: "text",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: param,
      success: fnSuccess
    });
  }
  // Fonction pour récupérer la géoposition du client
  // Retourne un objet JSON avec toutes les données voulues
  getSunMoodData(fnSuccess) {

    // Récupérer la position actuelle
    let geoposition = navigator.geolocation.getCurrentPosition(function (pos) {
      httpService.mainCtrl.addLogMessage("Position récupérée avec succès", true);
      let crd = pos.coords; // Coordonnées
      let lat = crd.latitude; // Latitude
      let lng = crd.longitude // Longitude

      // Requête vers l'API
      let url = "https://api.sunrisesunset.io/json";
      let param = "lat=" + lat + "&lng=" + lng;
      $.ajax(url, {
        type: "GET",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: param,
        success: function (data) {
          httpService.mainCtrl.addLogMessage("API d'informations de journée contacté avec succès !", true);
          fnSuccess(data);
        }
      });

    }, function () {
      httpService.mainCtrl.addLogMessage("Erreur lors de l'obtention de la géoposition", false);
    });


  }

  //Convertit une date du format "9:21:41 PM" en "21h 21m 41s"
  formatDate(date) {
    let dateFormated;
    let dateData = date.split(' ')[0];
    let dateIndicator = date.split(' ')[1];
    let hour = dateData.split(':')[0];
    let minute = dateData.split(':')[1];
    let second = dateData.split(':')[2];

    if (dateIndicator === "PM") {
      hour = parseInt(hour) + 12;
    }

    return hour + "h " + minute + "m " + second + "s";
  }
}