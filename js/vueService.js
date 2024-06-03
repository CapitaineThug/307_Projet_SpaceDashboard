/*
  But :    Worker de chargement des différentes vues pour la SPA
  Auteur : Nicolas Schmid
  Date :   03.06.2024 / V1.0 
*/

class VueService {

  // Constructeur
  constructor() {

  }
  // Fonction pour dynamiquement charger une vue
  chargerVue(vue, callback) {

    // charger la vue demandee
    $("#view").load("views/" + vue + ".html", function () {

      // si une fonction de callback est spécifiée, on l'appelle ici
      if (typeof callback !== "undefined") {
        callback();
      }

    });
  }

}