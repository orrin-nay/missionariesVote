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
        $gameIdSQL = "SELECT iduserinfo FROM userinfo WHERE `name` = ?";
        $userIdStmt = $link->prepare($gameIdSQL);
        $gameIdStmt->bind_param("s", $name);
        $gameIdStmt->execute();
        $gameIdStmt->bind_result($idGame);
        $gameIdStmt->fetch();
        $gameIdStmt->close();
        if(empty($idGame)){
          $addUserSQL = "INSERT INTO userinfo (`name`,`phone`, `email`)
           VALUES (?, ?, ?)";
          $addUserStmt = $link->prepare($addUserSQL);
          $addUserStmt->bind_param("sss", $name,$phoneNumber, $email);
          $addUserStmt->execute();
          $addUserStmt->close();

          $userIdSQL = "SELECT iduserinfo FROM userinfo WHERE `name` = ?";
          $userIdStmt = $link->prepare($userIdSQL);
          $userIdStmt->bind_param("s", $name);
          $userIdStmt->execute();
          $userIdStmt->bind_result($idUser);
          $userIdStmt->fetch();
          $userIdStmt->close();
        }
        $votesUserIdSQL = "SELECT iduser FROM votes WHERE `iduser` = ?";
        $votesUserIdStmt = $link->prepare($votesUserIdSQL);
        $votesUserIdStmt->bind_param("s", $idUser);
        $votesUserIdStmt->execute();
        $votesUserIdStmt->bind_result($voteUserId);
        $votesUserIdStmt->fetch();
        $votesUserIdStmt->close();
        if($voteUserId){
          echo'1';
        }
      $link->close();
      }
      else{
        echo'0';
      }
