<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
    $name = filter_input(INPUT_POST, 'name');
    $phoneNumber = filter_input(INPUT_POST, 'phone');
    $email = filter_input(INPUT_POST, 'email');
    if(!empty($email)){
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $email = NULL;
        echo '2';
        return;
      }
    }
    if(!empty($phoneNumber)){
      $phoneNumber = preg_replace("/[^0-9]/", '', $phoneNumber);
      if (strlen($phoneNumber) == 11) $phoneNumber = preg_replace("/^1/", '',$phoneNumber);
      if (strlen($phoneNumber) != 10){
         echo '3';
         return;
       }
    }
    if (!empty($name)) {
        require_once './conectvars.php';
        $userIdSQL = "SELECT iduserinfo FROM userinfo WHERE `name` = ?";
        $userIdStmt = $link->prepare($userIdSQL);
        $userIdStmt->bind_param("s", $name);
        $userIdStmt->execute();
        $userIdStmt->bind_result($idUser);
        $userIdStmt->fetch();
        $userIdStmt->close();
        if(empty($idUser)){
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
        session_start();
        $_SESSION['userId'] = $idUser;
      $link->close();
      }
      else{
        echo'0';
      }
