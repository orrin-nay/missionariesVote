<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
$userIds = json_decode(filter_input(INPUT_POST, 'userIds'));
session_start();
if (!empty($userIds) && $_SESSION['logedIn']) {

  require_once './conectvars.php';
  foreach ($userIds as $userId) {
    $deleteUserSQL = "DELETE FROM userinfo WHERE iduserinfo = ?";
    $deleteUserStmt = $link->prepare($deleteUserSQL);
    $deleteUserStmt->bind_param("i", $userId);
    $deleteUserStmt->execute();
    $deleteUserStmt->close();

    $getVotesSQL = "SELECT idvotes FROM votes WHERE `iduser` = ?";
    $getVotesStmt = $link->prepare($getVotesSQL);
    $getVotesStmt->bind_param("i", $userId);
    $getVotesStmt->execute();
    $getVotesStmt->bind_result($voteId);
    $linkTow  = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    while ($getVotesStmt->fetch()) {
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
