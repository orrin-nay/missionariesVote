<?php
   header('Access-Control-Allow-Origin: *');  
    $name = filter_input(INPUT_POST, 'name');
    $phoneNumber = filter_input(INPUT_POST, 'phone');
    $email = filter_input(INPUT_POST, 'email');
    if (
            !empty($name) &&
            !empty($phoneNumber) &&
            !empty($email) &&
            filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        require_once './conectvars.php';
        $userIdSQL = "SELECT iduserinfo FROM userinfo WHERE `name` = ?";
        $userIdStmt = $link->prepare($userIdSQL);
        $userIdStmt->bind_param("s", $name);
        $userIdStmt->execute();
        $userIdStmt->bind_result($idUser);
        $userIdStmt->fetch();
        $userIdStmt->close();
        if(empty($idUser)){
          $addUserSQL = "INSERT INTO iduserinfo (`name`,`phonenumber`, `email`)
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
      }
      else{
        echo'1';
      }
    $link->close();
  }
