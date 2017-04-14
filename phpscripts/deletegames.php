<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
$gameIds = json_decode(filter_input(INPUT_POST, 'gameIds'));
session_start();
if (!empty($gameIds) && $_SESSION['logedIn']) {
  require_once './conectvars.php';
  foreach ($gameIds as $gameId) {
    $deleteVoteSQL = "DELETE FROM games WHERE idgames = ?";
    $deleteVoteStmt = $link->prepare($deleteVoteSQL);
    $deleteVoteStmt->bind_param("i", $gameId);
    $deleteVoteStmt->execute();
    $deleteVoteStmt->close();
    echo $gameId;
    $getVotesSQL = "SELECT idvotes FROM votes WHERE `idgame` = ?";
    $getVotesStmt = $link->prepare($getVotesSQL);
    $getVotesStmt->bind_param("i", $gameId);
    $getVotesStmt->execute();
    $getVotesStmt->bind_result($voteId);
    $linkTow  = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    while ($getVotesStmt->fetch()) {
      echo "string";
      $deleteVotesSQL = "DELETE FROM votes WHERE idvotes = ?";
      $deleteVotesStmt = $linkTow->prepare($deleteVotesSQL);
      $deleteVotesStmt->bind_param("i", $voteId);
      $deleteVotesStmt->execute();
      $deleteVotesStmt->close();
    }
    $getVotesStmt->close();
    }
  $link->close();
}
