/**
 * Contrôleur de la page de statut des services web, vérifiant l'état des services spécifiés.
 * @autor Nicolas Schmid
 * @version 1.3
 * @since 10.06.2024
 */

class StatusCtrl {

  /**
   * Constructeur de la classe StatusCtrl.
   */
  constructor() {

    // Sites Web à vérifier l'état
    this.webList = {
      sites: [
        { id: "sunrisesunset", name: "Sunrise Sunset", url: "https://api.sunrisesunset.io/json", icon: "img/web_status/web_01.png" },
        { id: "dicebearpixelart", name: "Dicebear Pixel Art", url: "https://api.dicebear.com/8.x/pixel-art/svg", icon: "img/web_status/web_02.png" },
        { id: "issgeoposition", name: "ISS Geoposition", url: "https://api.wheretheiss.at/v1/satellites/25544", icon: "img/web_status/web_03.png" }
      ]
    };
    this.updateStatusInterval = [];
    this.setupStatusWebsite();

  }

  /**
   * Nettoie les ressources avant la suppression du contrôleur.
   */
  cleanup() {
    // Supprimer l'intervale de status des sites
    if (this.updateStatusInterval.length !== 0) {
      for (let i = 0; i < this.updateStatusInterval.length; i++) {
        clearInterval(this.updateStatusInterval[i]);
      }
      this.updateStatusInterval = [];
    }
  }

  /**
   * Configure et met en place le suivi des statuts des sites Web spécifiés.
   */
  setupStatusWebsite() {
    for (let i = 0; i < this.webList.sites.length; i++) {
      // Variables
      let name = this.webList.sites[i].name;
      let url = this.webList.sites[i].url;
      let icon = this.webList.sites[i].icon;
      let id = this.webList.sites[i].id;
      // Créer l'élément de site
      let websiteStatus = $('<div>', { class: 'websiteStatus', id: id });
      let webicon = $('<img>', { class: 'status_icon', src: icon });
      let webname = $('<p>', { text: name });
      let webstatus = $('<div>', { class: 'statusBox statusNOK', text: 'X' });

      // Créer le message d'erreur
      let webElement = websiteStatus.append(webicon, webname, webstatus);

      // Ajouter le site
      $("#websiteList").append(webElement);

      // Fonction de rafraîchissement du status
      let updateFn = function () {
        httpService.getWebsiteStatus(url, function () {
          webstatus.removeClass("statusNOK");
          webstatus.addClass("statusOK");
          webstatus.text("✓");
        }, function () {
          webstatus.removeClass("statusOK");
          webstatus.addClass("statusNOK");
          webstatus.text("X");
        });
      };
      updateFn(); // Appeler une fois

      // Interval pour rafraîchir le status des sites
      this.updateStatusInterval.push(setInterval(updateFn, 5000));
    }
  }

}