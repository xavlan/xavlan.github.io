<?php

require_once('constantes.php');

function dbConnect()
{
    try
    {
        $db = new PDO('mysql:host='.DB_SERVER.';dbname='.DB_NAME.';charset=utf8', DB_USER, DB_PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de connexion: '.$exception->getMessage());
        return false;
    }
    return $db;
}

function dbRequestParam($db, $utilisateur, $nom)
{
    try
    {
        $request = 'SELECT * FROM parametre WHERE utilisateur=:utilisateur AND nom=:nom';
        $statement = $db->prepare($request);
        $statement->bindParam(':utilisateur', $utilisateur, PDO::PARAM_STR);
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestNomParams($db)
{
    try
    {
        $request = 'SELECT nom FROM parametre';
        $statement = $db->prepare($request);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestMn90($db,$profondeur,$temps)
{
    try
    {
        $request = 'SELECT * FROM mn90 WHERE profondeur>=:profondeur AND duree_plongee>=:temps LIMIT 1';
        $statement = $db->prepare($request);
        $statement->bindParam(':profondeur', $profondeur, PDO::PARAM_INT);
        $statement->bindParam(':temps', $temps, PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestAllMn90Data($db) {
    try {
        $request = 'SELECT * FROM mn90';
        $statement = $db->prepare($request);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestAllParamData($db) {
    try {
        $request = 'SELECT * FROM parametre';
        $statement = $db->prepare($request);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestMn90Profondeur($db, $profondeur){
    try
    {
        $request = 'SELECT * FROM mn90 WHERE profondeur=:profondeur';
        $statement = $db->prepare($request);
        $statement->bindParam(':profondeur', $profondeur, PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestParametreUtilisateur($db,$utilisateur){
    try
    {
        $request = 'SELECT * FROM parametre WHERE utilisateur=:utilisateur';
        $statement = $db->prepare($request);
        $statement->bindParam(':utilisateur', $utilisateur, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbRequestConnexion($db,$email,$mdp){
    try {
        $request = 'SELECT CASE WHEN EXISTS (SELECT * FROM connexion WHERE email=:email AND mdp=:mdp) THEN 1 ELSE 0 END ';
        $statement = $db->prepare($request);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->bindParam(':mdp', $mdp, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return $result;
}

function dbAddMn90($db, $data)
{
    try {
        $request = 'INSERT INTO mn90 (profondeur, duree_plongee) VALUES (:profondeur, :duree)';
        $statement = $db->prepare($request);
        $statement->bindParam(':profondeur', $data['profondeur'], PDO::PARAM_INT);
        $statement->bindParam(':duree', $data['duree'], PDO::PARAM_INT);
        $statement->execute();
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbAddParam($db, $data)
{
    try {
        $utilisateur = $data['utilisateur'];
        $nom = $data['nom'];
        $vitesse_descente = $data['vitesse_descente'];
        $vitesse_remontee = $data['vitesse_remontee'];
        $volume_bouteille = $data['volume_bouteille'];
        $pression_bouteille = $data['pression_bouteille'];
        $respiration = $data['respiration'];
        $request = 'INSERT INTO parametre (utilisateur,nom,vitesse_descente,vitesse_remontee,volume_bouteille,pression_bouteille,respiration) VALUES 
                (:utilisateur, :nom, :vitesse_descente, :vitesse_remontee, :volume_bouteille, :pression_bouteille, :respiration);';

        $statement = $db->prepare($request);
        $statement->bindParam(':utilisateur', $utilisateur, PDO::PARAM_STR);
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':vitesse_descente', $vitesse_descente, PDO::PARAM_INT);
        $statement->bindParam(':vitesse_remontee', $vitesse_remontee, PDO::PARAM_INT);
        $statement->bindParam(':volume_bouteille', $volume_bouteille, PDO::PARAM_INT);
        $statement->bindParam(':pression_bouteille', $pression_bouteille, PDO::PARAM_INT);
        $statement->bindParam(':respiration', $respiration, PDO::PARAM_INT);
        $statement->execute();
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbModifyMn90($db, $data)
{
    try {
        $json_string = array_keys($data)[0];
        $decoded_array = json_decode($json_string, true);
        $keys = array_keys($decoded_array);
        if (is_array($decoded_array) && !empty($decoded_array)) {
            $profondeur = $decoded_array['profondeur'];
            $duree = $decoded_array['duree'];
    
    
        } else {
            echo "Erreur : le tableau décodé est vide ou n'est pas un tableau.\n";
        }
        $request = 'UPDATE mn90 SET ';
        $setStatements = [];
        foreach ($keys as $key) {
            if($key != 'profondeur' && $key != 'duree'){
                if($decoded_array[$key]===''){
                    $setStatements[] = "$key = NULL";
                }else{
                    $setStatements[] = "$key = :$key";
                }
            }
        }
        $request .= implode(", ", $setStatements);
        $request .= ' WHERE profondeur = :profondeur AND duree_plongee = :duree';
    
        $statement = $db->prepare($request);
        $statement->bindParam(':profondeur', $profondeur, PDO::PARAM_INT);
        $statement->bindParam(':duree', $duree, PDO::PARAM_INT);
        foreach ($keys as $key) {
            if($key != 'profondeur' && $key != 'duree' && $decoded_array[$key]!=''){
                $statement->bindParam(":$key", $decoded_array[$key], PDO::PARAM_INT);
                $statement->execute();
            }else if($key != 'profondeur' && $key != 'duree') {
                $statement->execute();
            }
        }
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbModifyParam($db, $data)
{
    try {
        $json_string = array_keys($data)[0];
        $decoded_array = json_decode($json_string, true);
        $keys = array_keys($decoded_array);
        if (is_array($decoded_array) && !empty($decoded_array)) {
            $utilisateur = $decoded_array['utilisateur'];
            $nom = $decoded_array['nom'];
        } else {
            echo "Erreur : le tableau décodé est vide ou n'est pas un tableau.\n";
        }
        $request = 'UPDATE parametre SET ';
        $setStatements = [];
        foreach ($keys as $key) {
            if($key != 'utilisateur' && $key != 'nom'){
                $setStatements[] = "$key = :$key";
            }
        }
        $request .= implode(", ", $setStatements);
        $request .= ' WHERE utilisateur = :utilisateur AND nom = :nom';

        $statement = $db->prepare($request);
        $statement->bindParam(':utilisateur', $utilisateur, PDO::PARAM_STR);
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        foreach ($keys as $key) {
            if($key != 'utilisateur' && $key != 'nom'){
                $statement->bindParam(":$key", $decoded_array[$key], PDO::PARAM_INT);
                $statement->execute();
            }
        }
    } catch (PDOException $exception) {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbDeleteMn90($db,$profondeur,$duree)
{
    try
    {
        $request = 'DELETE FROM mn90 WHERE profondeur=:profondeur AND duree_plongee=:temps';
        $statement = $db->prepare($request);
        $statement->bindParam(':profondeur', $profondeur, PDO::PARAM_INT);
        $statement->bindParam(':temps', $duree, PDO::PARAM_INT);
        $statement->execute();
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbDeleteParam($db,$utilisateur,$nom)
{
    try
    {
        $request = 'DELETE FROM parametre WHERE utilisateur=:utilisateur AND nom=:nom';
        $statement = $db->prepare($request);
        $statement->bindParam(':utilisateur', $utilisateur, PDO::PARAM_STR);
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->execute();
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}

function dbCreateMn90($db)
{
    try
    {
        $request = 
'DELETE FROM mn90;

INSERT INTO mn90 (profondeur, duree_plongee) VALUES
(6, 360),
(8, 360),
(10, 330),
(12, 135),
(15, 75),
(18, 50),
(20, 40),
(22, 35),
(25, 20),
(28, 15),
(30, 10),
(32, 10),
(35, 10),
(38, 5),
(40, 5),
(42, 5),
(45, 5),
(48, 5);

INSERT INTO mn90 (profondeur, duree_plongee, palier_3m) VALUES
(10, 360, 1),
(12, 140, 2),
(12, 150, 4),
(12, 160, 6),
(12, 170, 7),
(12, 180, 9),
(12, 190, 11),
(12, 200, 13),
(12, 210, 14),
(12, 220, 15),
(12, 230, 16),
(12, 240, 17),
(12, 250, 18),
(12, 255, 19),
(12, 270, 21),
(15, 80, 2),
(15, 85, 4),
(15, 90, 6),
(15, 95, 8),
(15, 100, 11),
(15, 105, 13),
(15, 110, 15),
(15, 115, 17),
(15, 120, 18),
(18, 55, 1),
(18, 60, 2),
(18, 65, 8),
(18, 70, 11),
(18, 75, 14),
(18, 80, 17),
(18, 85, 21),
(18, 90, 23),
(18, 95, 26),
(18, 100, 28),
(18, 105, 31),
(18, 110, 34),
(18, 115, 36),
(18, 120, 38),
(20, 45, 1),
(20, 50, 4),
(20, 55, 9),
(20, 60, 13),
(20, 65, 16),
(20, 70, 20),
(20, 75, 24),
(20, 80, 27),
(20, 85, 30),
(20, 90, 34),
(22, 40, 2),
(22, 45, 7),
(22, 50, 12),
(22, 55, 16),
(22, 60, 20),
(22, 65, 25),
(22, 70, 29),
(22, 75, 33),
(22, 80, 37),
(22, 85, 41),
(22, 90, 44),
(25, 25, 1),
(25, 30, 2),
(25, 35, 5),
(25, 40, 10),
(25, 45, 16),
(25, 50, 21),
(25, 55, 27),
(25, 60, 32),
(25, 65, 37),
(28, 20, 1),
(28, 25, 2),
(28, 30, 6),
(28, 35, 12),
(28, 40, 19),
(28, 45, 25),
(28, 50, 32),
(30, 15, 1),
(30, 20, 2),
(30, 25, 4),
(30, 30, 9),
(30, 35, 17),
(30, 40, 24),
(32, 15, 1),
(32, 20, 3),
(32, 25, 6),
(32, 30, 14),
(32, 35, 22),
(35, 15, 2),
(35, 20, 5),
(35, 25, 11),
(38, 10, 1),
(38, 15, 4),
(38, 20, 8),
(40, 10, 2),
(40, 15, 4),
(42, 10, 2),
(42, 15, 5),
(45, 10, 3),
(48, 10, 4),
(50, 5, 1),
(50, 10, 4),
(52, 5, 1),
(55, 5, 1),
(58, 5, 2),
(62, 5, 2),
(65, 5, 3); 

INSERT INTO mn90 (profondeur, duree_plongee, palier_3m,palier_6m) VALUES
(25, 70, 41, 1),
(25, 75, 43, 4),
(25, 80, 45, 7),
(25, 85, 48, 9),
(25, 90, 50, 11),
(28, 55, 36, 2),
(28, 60, 40, 4),
(28, 65, 43, 8),
(28, 70, 46, 11),
(28, 75, 48, 14),
(28, 80, 50, 17),
(28, 85, 53, 20),
(28, 90, 56, 23),
(30, 45, 31, 1),
(30, 50, 36, 3),
(30, 55, 39, 6),
(30, 60, 43, 10),
(30, 65, 46, 14),
(30, 70, 48, 17),
(32, 40, 29, 1),
(32, 45, 35, 4),
(32, 50, 39, 7),
(32, 55, 43, 11),
(32, 60, 46, 15),
(32, 65, 48, 19),
(32, 70, 50, 23),
(35, 30, 20, 1),
(35, 35, 27, 2),
(35, 40, 34, 5),
(35, 45, 39, 9),
(35, 50, 43, 14),
(35, 55, 47, 18),
(35, 60, 50, 22),
(38, 25, 16, 1),
(38, 30, 24, 3),
(38, 35, 33, 5),
(38, 40, 38, 10),
(38, 45, 43, 15),
(38, 50, 47, 20),
(40, 20, 9, 1),
(40, 25, 19, 2),
(40, 30, 28, 4),
(40, 35, 35, 8),
(40, 40, 40, 13),
(42, 20, 12, 1),
(42, 25, 22, 3),
(42, 30, 31, 6),
(42, 35, 37, 11),
(45, 15, 6, 1),
(45, 20, 15, 3),
(45, 25, 25, 5),
(45, 30, 35, 9),
(48, 15, 7, 2),
(48, 20, 19, 4),
(48, 25, 30, 7),
(50, 15, 9, 2),
(50, 20, 22, 4),
(52, 10, 4, 1),
(52, 15, 10, 3),
(55, 10, 5, 1),
(55, 15, 13, 4),
(58, 10, 5, 2),
(60, 10, 6, 2),
(62, 10, 7, 2),
(65, 10, 8, 6);

INSERT INTO mn90 (profondeur, duree_plongee, palier_3m,palier_6m,palier_9m) VALUES
(35, 65, 52, 26, 2),
(35, 70, 57, 28, 4),
(38, 55, 50, 23, 2),
(38, 60, 53, 27, 5),
(38, 65, 58, 29, 8),
(38, 70, 62, 31, 11),
(40, 45, 45, 18, 1),
(40, 50, 48, 23, 2),
(40, 55, 52, 26, 5),
(40, 60, 57, 29, 8),
(40, 65, 61, 21, 12),
(40, 70, 66, 33, 15),
(42, 40, 43, 16, 1),
(42, 45, 47, 21, 3),
(42, 50, 50, 24, 6),
(42, 55, 55, 29, 8),
(42, 60, 60, 30, 13),
(45, 35, 40, 15, 1),
(45, 40, 46, 20, 3),
(45, 45, 50, 24, 6),
(45, 50, 54, 28, 10),
(45, 55, 60, 30, 14),
(48, 30, 37, 12, 1),
(48, 35, 44, 18, 3),
(48, 40, 48, 23, 6),
(48, 45, 53, 27, 10),
(50, 25, 32, 8, 1),
(50, 30, 39, 14, 2),
(50, 35, 45, 20, 5),
(50, 40, 50, 24, 9),
(52, 20, 23, 5, 1),
(52, 25, 34, 9, 2),
(52, 30, 41, 15, 4),
(52, 35, 47, 22, 6),
(55, 20, 27, 6, 1),
(55, 25, 37, 11, 3),
(55, 30, 44, 18, 6),
(58, 15, 16, 4, 1),
(58, 20, 30, 7, 2),
(58, 25, 40, 13, 4),
(60, 15, 19, 4, 1),
(60, 20, 32, 8, 3),
(60, 25, 41, 15, 5),
(62, 15, 21, 5, 1),
(65, 15, 24, 5, 2);

INSERT INTO mn90 (profondeur, duree_plongee, palier_3m,palier_6m,palier_9m,palier_12m) VALUES
(45, 60, 65, 32, 18, 1),
(48, 50, 59, 30, 14, 1),
(48, 55, 64, 32, 18, 2),
(48, 60, 70, 36, 19, 5),
(50, 45, 55, 29, 12, 1),
(50, 50, 62, 30, 17, 2),
(50, 55, 67, 34, 19, 4),
(52, 40, 52, 36, 10, 2),
(52, 45, 59, 29, 15, 2),
(52, 50, 64, 32, 17, 5),
(52, 55, 71, 36, 19, 8),
(55, 35, 50, 23, 9, 1),
(55, 40, 55, 29, 12, 3),
(55, 45, 62, 31, 17, 5),
(55, 50, 69, 35, 19, 8),
(55, 55, 76, 37, 22, 12),
(58, 30, 46, 21, 7, 1),
(58, 35, 52, 26, 11, 2),
(58, 40, 59, 30, 15, 5),
(58, 45, 66, 33, 18, 8),
(60, 30, 48, 22, 8, 1),
(60, 35, 54, 28, 11, 4),
(60, 40, 62, 30, 17, 6);

INSERT INTO mn90 (profondeur, duree_plongee, palier_3m,palier_6m,palier_9m,palier_12m,palier_15m) VALUES
(58, 50, 74, 37, 21, 11, 1),
(58, 55, 83, 39, 23, 14, 3),
(60, 45, 69, 35, 19, 9, 1),
(60, 50, 78, 37, 22, 13, 2),
(60, 55, 88, 40, 24, 15, 5);';
        $statement = $db->prepare($request);
        $statement->execute();
    }
    catch (PDOException $exception)
    {
        error_log('Erreur de requête: '.$exception->getMessage());
        return false;
    }
    return true;
}
?>
