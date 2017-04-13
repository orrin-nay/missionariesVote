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
  $getUsersSQL = "SELECT iduserinfo, name FROM userinfo";
  $getUsersStmt = $link->prepare($getUsersSQL);
  $getUsersStmt->execute();
  $getUsersStmt->bind_result($idUser, $name);
  $users = array();
  $param = array();
  while ($getUsersStmt->fetch()) {
      $param = array();
      array_push($param, $idUser, $name);
      array_push($users, $param);
  }
  $getUsersStmt->close();
  $link->close();
  echo json_encode($users);
}
