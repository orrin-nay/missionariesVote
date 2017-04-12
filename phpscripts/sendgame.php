<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
$game = filter_input(INPUT_POST, 'game');
if (!empty($game)) {
    require_once './conectvars.php';
    $gameIdSQL = "SELECT idgames FROM games WHERE `name` = ?";
    $gameIdStmt = $link->prepare($gameIdSQL);
    $gameIdStmt->bind_param("s", $game);
    $gameIdStmt->execute();
    $gameIdStmt->bind_result($idGame);
    $gameIdStmt->fetch();
    $gameIdStmt->close();
    if(empty($idGame)){
      $addGameSQL = "INSERT INTO games (`name`)
       VALUES (?)";
      $addGameStmt = $link->prepare($addGameSQL);
      $addGameStmt->bind_param("s", $game);
      $addGameStmt->execute();
      $addGameStmt->close();

      $gameIdSQL = "SELECT idgames, name FROM games WHERE `name` = ?";
      $gameIdStmt = $link->prepare($gameIdSQL);
      $gameIdStmt->bind_param("s", $game);
      $gameIdStmt->execute();
      $gameIdStmt->bind_result($idGame, $name);
      $gameIdStmt->fetch();
      $gameIdStmt->close();
      $gameObject = array();
      array_push($gameObject, $idGame, $name);
      echo json_encode($gameObject);
    }
    else{
      echo '1';
    }
  $link->close();
  }
  else{
    echo '0';
  }
