<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
session_start();
if ($_SESSION['logedIn']) {
  require_once './conectvars.php';
  $getVotesSQL = "SELECT idvotes FROM votes";
  $getVotesStmt = $link->prepare($getVotesSQL);
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

  $linkTow->close();
  $getVotesStmt->close();

  $getUsersSQL = "SELECT email, name FROM userinfo";
  $getUsersStmt = $link->prepare($getUsersSQL);
  $getUsersStmt->execute();
  $getUsersStmt->bind_result(, $name);
  while ($getUsersStmt->fetch()) {
      mail($email,"New Game Night Vote Has Begun","$name, \n A vote for the game night in June has begun, it will conclude the same night as the next game night. \n Orrin Naylor.");
  }
  $getUsersStmt->close();
  $link->close();
}
