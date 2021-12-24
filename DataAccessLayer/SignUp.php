<?php
include('SqlQueries.php');
date_default_timezone_set('Europe/Moscow');
$timeStart = microtime(true);

$Name=$_POST["Name"];
$PhoneNumber=$_POST["Phone"];
$Email=$_POST["Email"];
$Password = $_POST["Password"];
$response="";
//$responseArray=array();
//$responseArray["Email"]=$Email;
//$responseArray["Name"]=$Name;
//$responseArray["Password"]=$Password;
//$responseArray["Phone"]=$PhoneNumber;
if(CheckEmail($Email))
    $response = "Уже есть пользователь с таким Email";
else if (AddNewUser($Name,$PhoneNumber,$Email,md5($Password)))
    $response = "Вы успешно зарегистрировались";
else
    $response = "Сожалеем, во время регистрации произола ошибка";

header("Content-Type:application/json");
echo  json_encode($response);




