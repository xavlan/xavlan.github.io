function afficherDonneesMn90() {                    //afficher le tableau de toute la base mn90 dans admin
    ajaxRequest('GET', 'php/request.php/allMn90Data', afficherTableau);
}

function afficherDonneesMn90Profondeur(profondeur) {                    //affiche le tableau de recherche de profondeur dans admin
    ajaxRequest('GET', 'php/request.php/mn90Profondeur/?profondeur=' + profondeur, afficherTableau);
}


function afficherDonneesParam() {                   //affiche le tableau de toute la base parametre
    ajaxRequest('GET', 'php/request.php/allParamData', afficherTableau);
}

function afficherDonneesParametre(utilisateur) {                    //affiche le tableau de recherche par utilisateur
    ajaxRequest('GET', 'php/request.php/parametreUtilisateur/?utilisateur=' + utilisateur, afficherTableau);
}


function afficherTableau(data){             //fonction qui affiche le tableau des elements de data
    if (data) {
        var tableContainer = document.getElementById('table-container');
        var table = document.createElement('table');
        table.classList.add('data-table');
        var type;
        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        for (var key in data[0]) {
            var th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        data.forEach(function(rowData) {
            var row = document.createElement('tr');
            for (var key in rowData) {
                if(key=='profondeur'){
                    type='mn90';
                }
                var cell = document.createElement('td');
                cell.textContent = rowData[key];
                row.appendChild(cell);
            }
            var emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
            
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', function() {
                var rowIndex = cell.parentElement.rowIndex - 1;

                var theadRow = cell.closest('table').querySelector('thead tr');
                var tbody = cell.closest('tbody');
                if (!theadRow || !tbody) {
                    console.error('Impossible de trouver les éléments nécessaires pour la mise à jour.');
                    return;
                }

                var id = [tbody.children[rowIndex].querySelector('td:first-child').textContent,tbody.children[rowIndex].querySelector('td:nth-child(2)').textContent];
                if(type=='mn90'){
                    deleteDataMn90(id);
                }else{
                    deleteDataParam(id);
                }
             });
            emptyCell.appendChild(deleteButton);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    } else {
        console.error('Réponse de la requête invalide');
    }
}

window.addEventListener('load', afficherDonneesMn90);   //au chargement de la page afficher le tableau de mn90

document.getElementById("createTableButton").addEventListener("click", function() {
    createTable();              //quand le bouton "rechercher cette profondeur" est cliqué, remplir la table mn90 avec les normes mn90
});

function ajouterLigneVide() {           //ajoute une nouvelle ligne dans le tableau mn90
    var table = document.querySelector('.data-table');
    var tbody = table.querySelector('tbody');
    var newRow = document.createElement('tr');
    let profondeurVal;
    let dureeVal;

    // Ajouter des cellules vides pour chaque colonne
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        let valide = false;

        var cell = document.createElement('td');
        if(i==0){
            while (!valide) {
                let input = prompt("Veuillez entrer la valeur de la profondeur (entier) :");
                profondeurVal = parseInt(input, 10);
                if (!isNaN(profondeurVal)) {
                    valide = true; 
                    cell.textContent = profondeurVal;
                } else {
                    alert("Ce n'est pas une valeur entière valide. Veuillez réessayer.");
                }
            }
        }else if(i==1){
            while (!valide) {
                let input = prompt("Veuillez entrer la valeur de la duree (entier) :");
                dureeVal = parseInt(input, 10);
                if (!isNaN(dureeVal)) {
                    valide = true; 
                    cell.textContent = dureeVal;
                } else {
                    alert("Ce n'est pas une valeur entière valide. Veuillez réessayer.");
                }
            }
        }else{
            cell.textContent = '';
        }
        newRow.appendChild(cell);
    }
    
    // Insérer la nouvelle ligne au début du tbody
    tbody.insertBefore(newRow, tbody.firstChild);

    // Envoyer les données de la nouvelle ligne à la base de données via une requête AJAX
    var newData = {
        profondeur: profondeurVal,
        duree: dureeVal
    };
    console.log(JSON.stringify(newData));

    // Envoyer les données via AJAX en utilisant la fonction ajaxRequest
    ajaxRequest('POST', 'php/request.php/mn90', afficherDonneesMn90, JSON.stringify(newData));
}



document.addEventListener('DOMContentLoaded', function() {          //en apuyant sur le bouton "ajouter une ligne" on créé une nouvelle ligne
    var addButton = document.getElementById('add-row-button');
    addButton.addEventListener('click', function() {
        ajouterLigneVide();
    });
});

document.addEventListener('click', function(event) {        //apporte la possibilité de modifier les tableaux
    if (event.target.tagName === 'TD') {
        var cell = event.target;
        var oldValue = cell.textContent;
        cell.textContent = '';
        var input = document.createElement('input');
        input.type = 'text';
        input.value = oldValue;
        cell.appendChild(input);
        input.focus();

        input.addEventListener('blur', function() {
            var newValue = input.value;
            var rowIndex = cell.parentElement.rowIndex - 1;
            var colIndex = cell.cellIndex;

            var theadRow = cell.closest('table').querySelector('thead tr');
            var tbody = cell.closest('tbody');
            if (!theadRow || !tbody) {
                console.error('Impossible de trouver les éléments nécessaires pour la mise à jour.');
                return;
            }

            var columnName = theadRow.children[colIndex].textContent;
            var id = [tbody.children[rowIndex].querySelector('td:first-child').textContent,tbody.children[rowIndex].querySelector('td:nth-child(2)').textContent];
            
            console.log(columnName+' '+newValue);
            if (document.getElementById('select-table').value === 'parameters'){
                updateDataParam(id, columnName, newValue);
            }else if (document.getElementById('select-table').value === 'mn90'){
                updateDataMn90(id, columnName, newValue);
            }
        });
    }
});

function updateDataMn90(id, columnName, newValue) {     //modifie les info de mn90
    var requestData = {};
    requestData['profondeur'] = id[0];
    requestData['duree'] = id[1];
    requestData[columnName] = newValue;
    
    ajaxRequest('PUT', 'php/request.php/mn90/', afficherDonneesMn90, JSON.stringify(requestData));
}

function updateDataParam(id, columnName, newValue) {            //modifie les info de parametre
    var requestData = {};
    requestData['utilisateur'] = id[0];
    requestData['nom'] = id[1];
    requestData[columnName] = newValue;
    console.log(requestData);
    
    ajaxRequest('PUT', 'php/request.php/parametreModif/', afficherDonneesParam, JSON.stringify(requestData));
}


document.getElementById('param-form-admin').addEventListener('submit', function(event) {            //on evite le fonctionnement par default
    event.preventDefault();
});

function deleteDataMn90(id) {                   //suprimer de mn90
    var profondeur = encodeURIComponent(id[0]); 
    var duree = encodeURIComponent(id[1]);
    ajaxRequest('DELETE', 'php/request.php/mn90/?profondeur=' + profondeur + '&duree=' + duree, afficherDonneesMn90);
}

function deleteDataParam(id) {                  //suprimer de parametre
    var utilisateur = encodeURIComponent(id[0]); 
    var nom = encodeURIComponent(id[1]);
    ajaxRequest('DELETE', 'php/request.php/parametre/?utilisateur=' + utilisateur + '&nom=' + nom, afficherDonneesParam);
}

function createTable() {                    //reinitialise la table aux normes mn90
    ajaxRequest('PUT', 'php/request.php/mn90/', afficherDonneesMn90);
}


document.getElementById('select-table').addEventListener('change', function() {         //rend les different bouton de admin visible ou hidden en fonction du tableau sur lequel on est
    var selectedOption = this.value;
    var boutonLigne=document.getElementById('createTableButton');
    var boutonMn90=document.getElementById('add-row-button');
    var boutonProfondeur=document.getElementById('recherche-profondeur');
    var textProfondeur=document.getElementById('recherche-profondeur-text');
    var boutonUtilisateur=document.getElementById('recherche-utilisateur');
    var textUtilisateur=document.getElementById('recherche-utilisateur-text');

    if (selectedOption === 'mn90') {
        console.log("mn");
        boutonLigne.classList.remove('hidden');
        boutonMn90.classList.remove('hidden');
        boutonProfondeur.classList.remove('hidden');
        textProfondeur.classList.remove('hidden');
        boutonUtilisateur.classList.add('hidden');
        textUtilisateur.classList.add('hidden');
        afficherDonneesMn90();
    } else if (selectedOption === 'parameters') {
        console.log("pm");
        boutonLigne.classList.add('hidden');
        boutonMn90.classList.add('hidden');
        boutonProfondeur.classList.add('hidden');
        textProfondeur.classList.add('hidden');
        boutonUtilisateur.classList.remove('hidden');
        textUtilisateur.classList.remove('hidden');
        document.getElementById('add-row-button');
        afficherDonneesParam();
    }
});

var inputProfondeur = document.getElementById('recherche-profondeur-text');
var boutonRechercheProfondeur = document.getElementById('recherche-profondeur');

boutonRechercheProfondeur.addEventListener('click', function() {            //affiche le tableau du resultat de la recherche par profondeur
    var profondeur = inputProfondeur.value;
    afficherDonneesMn90Profondeur(profondeur);
});

var inputUtilisateur = document.getElementById('recherche-utilisateur-text');
var boutonRechercheUtilisateur = document.getElementById('recherche-utilisateur');

boutonRechercheUtilisateur.addEventListener('click', function() {            //affiche le tableau du resultat de la recherche par utilisateur
    var utilisateur = inputUtilisateur.value;
    console.log(utilisateur);
    afficherDonneesParametre(utilisateur);
});