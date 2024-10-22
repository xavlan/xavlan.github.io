  document.addEventListener('DOMContentLoaded', function() {            // Appeler la fonction pour remplir le select lorsque la page est chargée
    ajaxRequest('GET', 'php/request.php/parametreNom/',remplirSelect);
  });


  function remplirSelect(donnees) {                     //remplie le select avec les valeur des nom de la bdd
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


document.getElementById('param-form').addEventListener('submit', function(e) {      //recupère les valeurs envoyer par le client qaund le bouton est pressé
    e.preventDefault();

    let profondeur = document.getElementById('profondeur').value;
    let temps = document.getElementById('temps').value;
    let data = '?profondeur=' + profondeur + '&temps=' + temps;
    ajaxRequest('GET', 'php/request.php/mn90' + data,getData);
    
});



function afficherDonneesDansTable(finalResult) {                  //fonction qui sert à créé le tableau en fontion des resultat obtenue
  var tableBody = document.querySelector('#tables .table-container table tbody');
  
  tableBody.innerHTML = '';

  var columnHeaderRow = document.createElement('tr');
  columnHeaderRow.innerHTML = '<th></th>'+
                              '<th>Profondeur (m)</th>' +
                              '<th>Temps (min)</th>' +
                              '<th>Pression ambiante (bar)</th>' +
                              '<th>Consommation (l)</th>' +
                              '<th>Bar restant</th>' +
                              '<th>Volume restant (l)</th>';
  tableBody.appendChild(columnHeaderRow);

  finalResult.forEach(function(data, index) {
      var row = document.createElement('tr');

      var roundedData = data.map(function(value) {
          return Number.isInteger(value) ? value : parseFloat(value).toFixed(1);
      });

      row.innerHTML =  '<td>t' + index + '</td>' +
                       '<td>' + roundedData[0] + '</td>' +
                       '<td>' + roundedData[1] + '</td>' +
                       '<td>' + roundedData[2] + '</td>' +
                       '<td>' + roundedData[3] + '</td>' +
                       '<td>' + roundedData[4] + '</td>' +
                       '<td>' + roundedData[5] + '</td>';

      if (parseFloat(roundedData[4]) <= 50) {
          row.querySelector('td:nth-child(6)').style.color = 'red';
      }
      tableBody.appendChild(row);
  });
  document.getElementById('tables').classList.remove('hidden');
}



function getData(result){           //fonction qui sert à créé le graphique en fontion des resultat obtenue
    let existingChart = Chart.getChart("myChart");

    // Vérifiez si le graphique existe et détruisez-le
    if(existingChart) {
        existingChart.destroy();
    }
    let profondeurConst = document.getElementById('profondeur').value;
    let tempsConst = document.getElementById('temps').value;
    if(result.length==0 || tempsConst==0){
        alert('verifier la valeur de la profondeur (entre 0 et 65 mètres) et du temps (>0)');
    }else{
        let palier=[];
        if (result[0]['palier_3m']!=null) {
            palier[0]=parseInt(result[0]['palier_3m']);
            if (result[0]['palier_6m']!=null) {
                palier[1]=parseInt(result[0]['palier_6m']);
                if (result[0]['palier_9m']!=null) {
                    palier[2]=parseInt(result[0]['palier_9m']);
                    if (result[0]['palier_12m']!=null) {
                        palier[3]=parseInt(result[0]['palier_12m']);
                        if (result[0]['palier_15m']!=null) {
                            palier[4]=parseInt(result[0]['palier_15m']);
                        }
                    }
                }
            }
        }
        console.log(palier);
        let nbPalier=palier.length;
        let n=3+2*nbPalier;
        let nom = document.getElementById('select-table').selectedOptions[0].textContent;
        console.log(nom);
        ajaxRequest('GET', 'php/request.php/parametre?utilisateur=default&nom='+ nom,(result2) => {        
            let vitDescConst=result2[0]['vitesse_descente'];
            let vitMontConst=result2[0]['vitesse_remontee'];
            let volumeBouteilleConst=result2[0]['volume_bouteille'];
            let barConst=parseInt(result2[0]['pression_bouteille']);
            let respirationConst=result2[0]['respiration'];
            let volumeAirVar = barConst*volumeBouteilleConst;
            let finalResult=[];
            let i=0;
            let j=0;
            let xValue=0;
            let coordonnee=[];

            while (i<=n) {
                finalResult[i]=[profondeur(i,profondeurConst,palier),
                                temps(i,profondeurConst,vitDescConst,vitMontConst,tempsConst,palier),
                                pression(i,profondeurConst,palier),
                                consomation(i,profondeurConst,palier,respirationConst,vitDescConst,vitMontConst,tempsConst),
                                bar(i,profondeurConst,palier,respirationConst,vitDescConst,vitMontConst,tempsConst,volumeAirVar,volumeBouteilleConst),
                                volumeAirVar=air(i,profondeurConst,palier,respirationConst,vitDescConst,vitMontConst,tempsConst,volumeAirVar)
                ] 
                j=i;
                xValue=0;
                while(j!=0){
                    xValue+=finalResult[j][1]
                    j-=1;
                }
                coordonnee[i]={x : xValue, y : -finalResult[i][0]}
                i+=1;
            }
            console.log(finalResult);
            afficherDonneesDansTable(finalResult);
            



            const ctx = document.getElementById('myChart').getContext('2d');
            const additionalData = finalResult

            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Profil de plongée',
                        data: coordonnee,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 4,
                        pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
                        pointBorderColor: 'rgba(54, 162, 235, 1)',
                        pointBorderWidth: 1,
                        pointRadius: 10,
                        pointStyle: 'Rounded',
                        fill: false,
                        showLine: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'TEMPS (minutes)'
                            },
                            grid: {
                                display: true,
                                color: 'rgba(200, 200, 200, 0.2)'
                            },
                            ticks: {
                                stepSize: 5
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'PROFONDEUR (mètres)'
                            },
                            grid: {
                                display: true,
                                color: 'rgba(200, 200, 200, 0.2)'
                            },
                            ticks: {
                                stepSize: 10
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let index = context.dataIndex;
                                    let additional = additionalData[index];
                                    let label = 'Profondeur : ' + additional[0] +
                                        ' mètres | Temps : ' + additional[1] +
                                        ' minutes | Pression ambiante : ' + additional[2] +
                                        ' bar | Consommation : ' + additional[3] +
                                        ' litres | Bar restant : ' + additional[4] +
                                        ' bar | Vol restant : ' + additional[5] + ' litres';
                                    return label;
                                }
                            }
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                },
                                color: 'rgba(54, 162, 235, 1)'
                            }
                        }
                    }
                }
            });

        });
    }
}




function profondeur(n,profondeurConst,hauteurPalier){     //recupère la profondeur en fonction de telle point
    let nbPalier=hauteurPalier.length;
    let indice = n-3;
    if(n==0 || (n==(3+2*nbPalier))){
      return 0
    }else if(n==1 || (n==2)){
      return profondeurConst
    }else{
      indice=Math.floor(indice /2)
      return (nbPalier-indice)*3
    }
  }
  
  function temps(n,profondeurConst,vitDescConst,vitMontConst,tempsConst,hauteurPalier){   //recupère le temps en fonction de telle point
    let nbPalier=hauteurPalier.length;
    let indice = n-3;
    indice=Math.floor(indice /2)
    if(n==0){
      return 0
    }else if(n==1){
      return profondeurConst/vitDescConst
    }else if(n==2){
      return tempsConst-(profondeurConst/vitDescConst)
    }else if(n==3){
      return (profondeurConst-(nbPalier*3))/vitMontConst
    }else if(n%2==0){
      return hauteurPalier[nbPalier-indice-1]
    }else{
      return 3/vitMontConst
    }
  }
  
  function pression(n,profondeurConst,hauteurPalier){   //recupère la pression en fonction de telle point
    let nbPalier=hauteurPalier.length;
    let indice = n-3;
    indice=Math.floor(indice /2)
    if(n==0){
      return 1
    }else if(n==(3+2*nbPalier)){
      return ((1+pression(n-1,profondeurConst,hauteurPalier))/2)
    }else if(n==1){
      return (2+(profondeurConst/10))/2
    }else if(n==2){
      return 1+profondeurConst/10
    }else if(n==3){
      return (2+(profondeurConst/10)+((nbPalier*3)/10))/2
    }else if(n%2==0){
      return 1+((nbPalier-indice)*3)/10
    }else{
      return 1+(((nbPalier-indice+1)*3/10)+((nbPalier-indice)*3/10))/2
    }
  }
  
  function consomation(n,profondeurConst,hauteurPalier,respirationConst,vitDescConst,vitMontConst,tempsConst){    //recupère la consommation en fonction de telle point
    if(n==0){
      return 0
    }else{
      return respirationConst * pression(n,profondeurConst,hauteurPalier) * temps(n,profondeurConst,vitDescConst,vitMontConst,tempsConst,hauteurPalier)
    }
  }
  
  function air(n,profondeurConst,hauteurPalier,respirationConst,vitDescConst,vitMontConst,tempsConst,volumeAirVar){   //recupère l'air restant' en fonction de telle point
      return volumeAirVar-consomation(n,profondeurConst,hauteurPalier,respirationConst,vitDescConst,vitMontConst,tempsConst)
  }
  
  function bar(n,profondeurConst,hauteurPalier,respirationConst,vitDescConst,vitMontConst,tempsConst,volumeAirVar,volumeBouteilleConst){    //recupère les bars en fonction de telle point
    return air(n,profondeurConst,hauteurPalier,respirationConst,vitDescConst,vitMontConst,tempsConst,volumeAirVar)/volumeBouteilleConst
  }





  