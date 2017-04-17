<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
    $name = filter_input(INPUT_POST, 'name');
    $email = filter_input(INPUT_POST, 'email');
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      $email = NULL;
      echo '2';
      return;
    }
    if (!empty($name)) {
        require_once './conectvars.php';
        $userIdSQL = "SELECT iduserinfo FROM userinfo WHERE `email` = ?";
        $userIdStmt = $link->prepare($userIdSQL);
        $userIdStmt->bind_param("s", $email);
        $userIdStmt->execute();
        $userIdStmt->bind_result($idUser);
        $userIdStmt->fetch();
        $userIdStmt->close();
        if(empty($idUser)){
          $addUserSQL = "INSERT INTO userinfo (`name`, `email`)
           VALUES (?, ?)";
          $addUserStmt = $link->prepare($addUserSQL);
          $addUserStmt->bind_param("ss", $name, $email);
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
        session_start();
        $_SESSION['userId'] = $idUser;
      $link->close();
      }
      else{
        echo'0';
      }
