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
    this.vueService.chargerVue("main", () => new MainCtrl());
  }
  // Fonction pour charger la page de status
  loadStatusView() {
    this.vueService.chargerVue("status", () => new StatusCtrl());
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
  updateAvatar(){
    let icon = httpService.getRandomAvatar();
  }
}