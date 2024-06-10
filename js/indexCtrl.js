/**
 * Contrôleur principal de l'application, gérant les vues et les fonctionnalités de base.
 * @author Nicolas Schmid
 * @version 1.3
 * @since 10.06.2024
 */

// JS quand DOM prêt
$(document).ready(function () {
  // Instancier le classes
  window.httpService = new HttpService();
  window.indexCtrl = new IndexCtrl();
  httpService.httpErrorsSetup(indexCtrl.addLogMessage);
});

class IndexCtrl {

  /**
   * Constructeur de la classe IndexCtrl.
   */
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

  /**
   * Charge la vue de la page principale.
   */
  loadMainView() {
    this.vueService.chargerVue("main", () => {
      this.cleanupCtrl();
      this.controllers.main = new MainCtrl();
    });
  }
  /**
   * Charge la vue de la page de statut.
   */
  loadStatusView() {
    this.vueService.chargerVue("status", () => {
      this.cleanupCtrl();
      this.controllers.status = new StatusCtrl();
    });
  }

  /**
   * Ajoute des écouteurs dynamiques pour la navigation.
   */
  addEventListener() {
    // Navigation
    $("#nav_main").click(() => {
      this.loadMainView();
    });
    $("#nav_status").click(() => {
      this.loadStatusView();
    });
  }

  /**
   * Met à jour l'avatar de l'utilisateur.
   */
  updateAvatar() {
    httpService.getRandomAvatar(function (avatar) {
      $("#avatar").html(avatar);
      indexCtrl.addLogMessage("Avatar rafraîchi avec succès", true);
    });
  }

  /**
   * Nettoie les contrôleurs lors du changement de page.
   */
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
  /**
   * Ajoute un message de log si possible.
   * @param {string} msg - Le message du log.
   * @param {boolean} success - Indique si le log est un succès ou non.
   */
  addLogMessage(msg, success) {
    if (this.controllers.main) {
      this.logsCount += 1;
      this.controllers.main.addLogMessage("[#" + this.logsCount + "] " + msg, success);
    }
  }
}