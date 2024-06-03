/*
  But :    Contrôleur du Dashboard contenant toutes les informations sur l'espace
  Auteur : Nicolas Schmid
  Date :   03.06.2024 / V1.0 
*/

class MainCtrl {

  // Constructeur
  constructor() {
    // Ajouter la référence au httpService
    window.httpService.mainCtrl = this;

    // Log de bienvenue
    this.addLogMessage("Page chargée avec succès !", true);
  }

  // Fonction pour afficher un message d'erreur
  addLogMessage(msg, success) {
    // Créer les éléments du message
    let journalDiv = $('<div>', { class: 'journal' });
    let logStatusDiv;

    if (success === true) {
      logStatusDiv = $('<div>', { class: 'logStatus logSuccess', text: '✓' });
    } else {
      logStatusDiv = $('<div>', { class: 'logStatus logError', text: 'X' });
    }

    let successMessage = $('<p>', { text: msg });

    // Créer le message d'erreur
    let journal = journalDiv.append(logStatusDiv, successMessage);

    // Ajouter le message au document
    $("#logArray").prepend(journal);

    //Supprimer le plus ancien dès 5 logs
    if ($("#logArray").children().length > 5) {
      $("#logArray").children().last().remove();
    }

  }

}