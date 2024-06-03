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
        let isError = true;
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
        httpErrorCallbackFn(msg, isError);
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
}