<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
$votes = json_decode(filter_input(INPUT_POST, 'votes'));
if (!empty($votes)) {
  session_start();
  $userId = $_SESSION['userId'];
    require_once './conectvars.php';
    $userVoteSQL = "SELECT idgame FROM votes WHERE `iduser` = ?";
    $userVoteStmt = $link->prepare($userVoteSQL);
    $userVoteStmt->bind_param("s", $userId);
    $userVoteStmt->execute();
    $userVoteStmt->bind_result($idGame);
    $userVoteStmt->fetch();
    $userVoteStmt->close();
    if(empty($idGame)){
      foreach ($votes as $vote) {
      $addVoteSQL = "INSERT INTO votes (`idgame`,`iduser`)
       VALUES (?,?)";
      $addVoteStmt = $link->prepare($addVoteSQL);
      $addVoteStmt->bind_param("ss", $vote, $userId);
      $addVoteStmt->execute();
      $addVoteStmt->close();
      }
    }
    else{
      echo '1';
    }
  $link->close();
  }
  else{
    echo '0';
  }
