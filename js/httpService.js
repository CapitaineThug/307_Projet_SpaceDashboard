/**
 * Service HTTP pour effectuer des requêtes vers des services web.
 * @author Nicolas Schmid
 * @version 1.3
 * @since 10.06.2024
 */

class HttpService {

  /**
   * Constructeur de la classe HttpService.
   */
  constructor() {
  }

  /**
   * Configure la gestion des erreurs HTTP en définissant une fonction de rappel.
   * @param {function} httpErrorCallbackFn - La fonction de rappel pour gérer les erreurs HTTP.
   */
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
        indexCtrl.addLogMessage(msg, success);
      },
    });
  }

  /**
   * Récupère un avatar aléatoire à partir d'une API externe.
   * @param {function} fnSuccess - La fonction de rappel pour gérer le succès de la requête.
   */
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
  /**
   * Récupère la géoposition du client et les données du lever et coucher du soleil à partir d'une API externe.
   * @param {function} fnSuccess - La fonction de rappel pour gérer le succès de la requête.
   * @returns {void}
   */
  getSunData(fnSuccess) {
    // Récupérer la position actuelle
    let geoposition = navigator.geolocation.getCurrentPosition(function (pos) {
      indexCtrl.addLogMessage("Position récupérée avec succès", true);
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
          indexCtrl.addLogMessage("API d'informations de journée contacté avec succès !", true);
          fnSuccess(data);
        }
      });

    }, function () {
      indexCtrl.addLogMessage("Erreur lors de l'obtention de la géoposition", false);
    });
  }

  /**
   * Convertit une date du format "9:21:41 PM" en "21h 21m 41s".
   * @param {string} date - La date à formater.
   * @returns {string} - La date formatée.
   */
  formatDate(date) {
    let result = "Aucune donnée";
    if (date != null) {
      let dateData = date.split(' ')[0];
      let dateIndicator = date.split(' ')[1];
      let hour = dateData.split(':')[0];
      let minute = dateData.split(':')[1];
      let second = dateData.split(':')[2];

      if (dateIndicator === "PM") {
        hour = parseInt(hour) + 12;
      }
      result = hour + "h " + minute + "m " + second + "s";
    }
    return result;
  }

  /**
   * Met à jour la position de l'ISS en interrogeant une API externe.
   * @param {function} fnSuccess - La fonction de rappel pour gérer le succès de la requête.
   */
  updateISSLocation(fnSuccess) {
    // Requête vers l'API
    let satelliteID = 25544;
    let url = "https://api.wheretheiss.at/v1/satellites/" + satelliteID;
    $.ajax(url, {
      type: "GET",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
        indexCtrl.addLogMessage("API de position de l'IIS contacté avec succès !", true);
        fnSuccess(data);
      }
    });
  }

  /**
   * Vérifie l'état d'un lien web en effectuant une requête.
   * @param {string} url - L'URL du lien web à vérifier.
   * @param {function} fnSuccess - La fonction de rappel pour gérer le succès de la requête.
   * @param {function} fnError - La fonction de rappel pour gérer l'erreur de la requête.
   */
  getWebsiteStatus(url, fnSuccess, fnError) {
    let success = false;
    fetch(url, { mode: 'no-cors' })
      .then(fnSuccess)
      .catch(fnError);
  }
}