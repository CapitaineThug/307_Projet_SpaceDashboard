/**
 * Service pour charger dynamiquement les vues de l'application.
 * @autor Nicolas Schmid
 * @version 1.3
 * @since 10.06.2024
 */

class VueService {

  /**
   * Constructeur de la classe VueService.
   */
  constructor() {

  }
  /**
   * Charge dynamiquement une vue spécifiée.
   * @param {string} vue - Le nom de la vue à charger.
   * @param {function} [callback] - La fonction de rappel à exécuter après le chargement de la vue.
   */
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