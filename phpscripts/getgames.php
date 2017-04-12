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
$param = array();
while ($getGameStmt->fetch()) {
    $param = array();
    array_push($param, $idGame, $name);
    array_push($games, $param);
}
$getGameStmt->close();
$link->close();
echo json_encode($games);
