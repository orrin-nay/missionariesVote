<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
require_once './conectvars.php';
$getGameSQL = "SELECT idgames, name FROM games";
$getGameStmt = $link->prepare($getGameSQL);
$getGameStmt->execute();
$getGameStmt->bind_result($idGame, $name);
$games = array();
$linkTow  = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
$i = 0;
while ($getGameStmt->fetch()) {
  $getVotesSQL = "SELECT null FROM votes WHERE `idgame` = ?";
  $getVotesStmt = $linkTow->prepare($getVotesSQL);
  $getVotesStmt->bind_param("s", $idGame);
  $getVotesStmt->execute();
  $games[$name] = $i;
  $getVotesStmt->close();
  $i++;
}
$getGameStmt->close();
$link->close();
$linkTow->close();
$gamesObject = array();
arsort($games);
$i = 0;
foreach ($games as $key => $value) {
  $gamesObject[$key] =  $value;
  $i++;
  if($i == 5){
    break;
  }
}
echo json_encode($gamesObject);
