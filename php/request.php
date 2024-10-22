<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

require_once('database.php');

//Connexion à la BDD
$db = dbConnect();
if (!$db)
{
  header('HTTP/1.1 503 Service Unavailable');
  exit;
}

//Vérifier la requête
$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestResource = array_shift($request);

//Vérifier l'id associée à la requête
$id = array_shift($request);
if ($id == '')
  $id = NULL;
$data = false;


if ($requestMethod == 'GET') {
    if ($requestResource == 'parametre') {
        $data = dbRequestParam($db, $_GET['utilisateur'], $_GET['nom']);                //on récupère les infos d'un paramètre particulier 
    }elseif ($requestResource == 'parametreNom') {
        $data = dbRequestNomParams($db);                                //on la liste des noms des paramètre
    }elseif ($requestResource == 'mn90') {
        $data = dbRequestMn90($db, intval($_GET['profondeur']), intval($_GET['temps']));            //on récupère les infos d'une ligne de mn90 particulière 
    } elseif ($requestResource == 'allMn90Data') { 
        $data = dbRequestAllMn90Data($db);                              //on récupère l'ensemble des info des mn90
    }elseif ($requestResource == 'allParamData') { 
        $data = dbRequestAllParamData($db);                             //on récupère l'ensemble des info des paramètre
    }elseif ($requestResource == 'mn90Profondeur') { 
        $data = dbRequestMn90Profondeur($db,intval($_GET['profondeur']));            //on récupère les infos des ligne de mn90 correspondant à une certaine profondeur
    }elseif ($requestResource == 'parametreUtilisateur') { 
        $data = dbRequestParametreUtilisateur($db,$_GET['utilisateur']);            //on récupère les infos des ligne de paramètre correspondant à un certain utilisateur
    }elseif ($requestResource == 'connexion') { 
        $data = dbRequestConnexion($db,$_GET['email'],$_GET['mdp']);                //vérifie que les identifiant sont bon
    }
}


if ($requestMethod == 'POST') {
    if ($requestResource == 'mn90') {
        $data = dbAddMn90($db, json_decode(file_get_contents('php://input'), true));        //ajoute une ligne dans mn90 dans la bdd
    }else if($requestResource == 'parametre'){
        parse_str(file_get_contents("php://input"), $_PUT);
        $data = dbAddParam($db,json_decode(file_get_contents("php://input"), true));        //ajoute une ligne dans paramètre dans la bdd
    }
}

if ($requestMethod == 'PUT') {
    if ($requestResource == 'mn90' && file_get_contents("php://input")!=null) {
        parse_str(file_get_contents("php://input"), $_PUT);                     
        $data = dbModifyMn90($db,$_PUT);                            //modifie une ligne de mn90 dans la bdd
    }else if($requestResource == 'mn90'){
        $data = dbCreateMn90($db);                          //réinitialise la base selon la norme mn90 dans la bdd
    }else if($requestResource == 'parametreModif'){
        parse_str(file_get_contents("php://input"), $_PUT);
        $data = dbModifyParam($db,$_PUT);                           //modifie une ligne de paramètre la bdd
    }
}

if ($requestMethod == 'DELETE') {
    if ($requestResource == 'mn90') {
        $data = dbDeleteMn90($db, $_GET['profondeur'], $_GET['duree']);     //suprime une ligne particulière de mn90 dans la bdd
    }else if ($requestResource == 'parametre') {
        $data = dbDeleteParam($db, $_GET['utilisateur'], $_GET['nom']);     //suprime une ligne particulière de paramètre dans la bdd
    }
}


// envoyer une réponse.
if ($data !== false) {
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
} else {
    header('HTTP/1.1 400 Bad Request');
}
exit;
?>
