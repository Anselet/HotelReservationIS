<?php

include('SqlQueries.php');

date_default_timezone_set('Europe/Moscow');
$timeStart = microtime(true);

$Email = $_POST["Email"];
$Password = md5($_POST["Password"]);
$response = "";
//$responseArray=array();
//$responseArray["Email"]=$Email;
//$responseArray["Name"]=$Name;
//$responseArray["Password"]=$Password;
//$responseArray["Phone"]=$PhoneNumber;
if (!CheckEmail($Email))
    $response = "Пользователь с таким Email не найден";
$PasswordFormSQL = getUserPassword($Email);
if($Password==$PasswordFormSQL){
    $response = 1;
    session_start();
    $_SESSION["User"]=getUserInfo($Email);
}
else $response = 0;
//else if (AddNewUser($Name, $PhoneNumber, $Email, $Password))
//    $response = "Вы успешно зарегистрировались";
//else
//    $response = "Сожалеем, во время регистрации произола ошибка";

header("Content-Type:application/json");
echo json_encode($response);




