<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');
$hasedPassword = '$2y$10$t3jEIwIkzK0XUFs9oicVFOydTp91rcrjsXmmjiPamHGBuVF9P.5IC';
$realUsername = 'orrin';
if($username != $realUsername || !password_verify($password, $hasedPassword)){
  echo "1";
}
else{
  session_start();
  $_SESSION['logedIn'] = true;
}
