/*
  But :    Contrôleur des status des services Web
  Auteur : Nicolas Schmid
  Date :   03.06.2024 / V1.0 
*/

class StatusCtrl {

  // Constructeur
  constructor() {

    // Sites Web à vérifier l'état
    this.webList = {
      sites: [
        { name: "Sunrise Sunset", url: "https://api.sunrisesunset.io/json", icon: "img/web.png" },
        { name: "Dicebear Pixel Art", url: "https://api.dicebear.com/8.x/pixel-art/svg", icon: "img/web.png" },
        { name: "ISS Geoposition", url: "http://api.open-notify.org/iss-now.json", icon: "img/web.png" }
      ]
    };

    this.setupStatusWebsite();

  }

  // Fonction pour créer chaque site de status
  setupStatusWebsite() {
    for (let i = 0; i < this.webList.sites.length; i++) {
      // Variables
      let name = this.webList.sites[i].name;
      let url = this.webList.sites[i].url;
      let icon = this.webList.sites[i].icon;
      // Créer l'élément de site
      let websiteStatus = $('<div>', { class: 'websiteStatus' });
      let webicon = $('<img>', { class: 'status_icon', src: icon });
      let webname = $('<p>');
      let webstatus = $('<div', { class: 'statusBox' });

      // Créer le message d'erreur
      let webElement = websiteStatus.append(webicon, webname, webstatus);

      // Ajouter le site

    }
  }

}