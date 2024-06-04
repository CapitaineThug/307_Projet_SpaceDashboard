/*
  But :    Contrôleur de l'index étant la page principale du site
  Auteur : Nicolas Schmid
  Date :   03.06.2024 / V1.0 
*/


// JS quand DOM prêt
$(document).ready(function () {
  // Instancier le classes
  window.httpService = new HttpService();
  window.indexCtrl = new IndexCtrl();
  httpService.httpErrorsSetup(indexCtrl.addLogMessage);
});

class IndexCtrl {

  // Constructeur
  constructor() {

    // Stocker les autres contrôleurs
    this.controllers = {
      main: null,
      status: null
    };

    // Compteur de logs
    this.logsCount = 0;

    // Instancier le gestionnaire multipage
    this.vueService = new VueService();

    // Ajout des écouteurs
    this.addEventListener();

    // Charger la page "main"
    this.loadMainView();

    // Charger un avatar depuis l'API
    this.updateAvatar();

  }

  // Fonction pour charger la page principale
  loadMainView() {
    this.vueService.chargerVue("main", () => {
      this.cleanupCtrl();
      this.controllers.main = new MainCtrl();
    });
  }
  // Fonction pour charger la page de status
  loadStatusView() {
    this.vueService.chargerVue("status", () => {
      this.cleanupCtrl();
      this.controllers.status = new StatusCtrl();
    });
  }

  // Fonction pour ajouter les écouteurs dynamiques
  addEventListener() {
    // Navigation
    $("#nav_main").click(() => {
      this.loadMainView();
    });
    $("#nav_status").click(() => {
      this.loadStatusView();
    });
  }

  // Fonction pour rafraichir l'avatar
  updateAvatar() {
    httpService.getRandomAvatar(function (avatar) {
      $("#avatar").html(avatar);
      indexCtrl.addLogMessage("Avatar rafraîchi avec succès", true);
    });
  }

  // Fonction pour nettoyer les contrôleurs lors du changement de page
  cleanupCtrl() {
    if (this.controllers.main) {
      this.controllers.main.cleanup();
      this.controllers.main = null;
    }
    if (this.controllers.status) {
      this.controllers.status.cleanup();
      this.controllers.status = null;
    }
  }
  // Ajoute si possible un log dans la liste
  addLogMessage(msg, success) {
    if (this.controllers.main) {
      this.logsCount += 1;
      this.controllers.main.addLogMessage("[#" + this.logsCount + "] " + msg, success);
    }
  }
}