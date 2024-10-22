// Définir la fonction pour 
function recupererAllDonnees() {
    ajaxRequest('GET', 'php/request.php/parametre/?utilisateur=default&nom=default', function(response) {       //afficher les parametre de base et remplie le select
        afficherDonnees(response);
        ajaxRequest('GET', 'php/request.php/parametreNom/',remplirSelect);
    });
}

function afficherDonnees(donnees) {             //affiche les données d'un parametre dans le tableau
    var tableBody = document.querySelector('#tables .table-container table tbody');
    tableBody.innerHTML = '';
    if (donnees.length > 0) {
        var donnee = donnees[0];
        var rows = '';
        rows += '<tr><td>Nom du profil</td><td>' + donnee.nom + ' </td></tr>';
        rows += '<tr><td>Vitesse de descente</td><td>' + donnee.vitesse_descente + ' m/min</td></tr>';
        rows += '<tr><td>Vitesse de remontée</td><td>' + donnee.vitesse_remontee + ' m/min</td></tr>';
        rows += '<tr><td>Bouteille</td><td>' + donnee.volume_bouteille + ' l</td></tr>';
        rows += '<tr><td>Pression bouteille</td><td>' + donnee.pression_bouteille + ' b</td></tr>';
        rows += '<tr><td>Respiration</td><td>' + donnee.respiration + ' l/min</td></tr>';
        rows += '<tr><td>Table Mn90</td><td><a href="img/MN90.pdf" target="_blank">PDF</a></td></tr>';
        tableBody.innerHTML = rows;
    } else {
        tableBody.innerHTML = '<tr><td colspan="2">Aucune donnée disponible</td></tr>';
    }
}

function remplirSelect(donnees) {               //remplie le select avec les valeur des nom de la bdd
    var selectTable = document.getElementById('select-table');
    while (selectTable.options.length > 1) {
        selectTable.remove(1);
    }
    console.log(donnees)
    donnees.forEach(function(donnee) {
        console.log(donnee);
        var option = document.createElement('option');
        option.value = donnee.id;
        option.text = donnee.nom;
        selectTable.add(option);
    });
}


document.addEventListener('DOMContentLoaded', function() {          // Appeler la fonction pour récupérer les données lorsque la page est chargée
    recupererAllDonnees();
});



function addParam(donneesUtilisateur) {                     //ajoute les données que l'utilisateur rentre dans la bdd
    donneesUtilisateur['utilisateur'] = 'default';
    ajaxRequest('POST', 'php/request.php/parametre/', function(response) {
        recupererAllDonnees();
    }, JSON.stringify(donneesUtilisateur));
}

var form = document.getElementById('param-form');

form.addEventListener('submit', function(event) {             //recupère et envoie les données que l'utilisateur rentre
    event.preventDefault();

    var nom = document.getElementById('nom').value;
    var vitesseDescente = document.getElementById('vitesse-descente').value;
    var vitesseRemontee = document.getElementById('vitesse-remontee').value;
    var bouteille = document.getElementById('bouteille').value;
    var pressionBouteille = document.getElementById('pression-bouteille').value;
    var respiration = document.getElementById('respiration').value;

    var donneesUtilisateur = {
        nom: nom,
        vitesse_descente: vitesseDescente,
        vitesse_remontee: vitesseRemontee,
        volume_bouteille: bouteille,
        pression_bouteille: pressionBouteille,
        respiration: respiration
    };
    console.log(donneesUtilisateur);
    addParam(donneesUtilisateur);
});

document.getElementById('select-table').addEventListener('change', function() {         //permet de charger une nouvelle table de données en fonction de ce qui à été selectionné
    var selectedOption = this.selectedOptions[0];
    var selectedName = selectedOption.textContent;
    console.log("Nom sélectionné : " + selectedName);

    recupererDonnees(selectedName);
});

function recupererDonnees(nom) {            //recuperer les noms de la table (utilisateur default car login non terminé)
    console.log(nom);
    ajaxRequest('GET', 'php/request.php/parametre/?utilisateur=default&nom='+ nom, function(response) {
        afficherDonnees(response);
    });
}





