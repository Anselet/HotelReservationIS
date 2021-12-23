<?php

include('SqlQueries.php');
session_start();
date_default_timezone_set('Europe/Moscow');
$timeStart = microtime(true);

$Email = $_POST["Email"];
$Password = $_POST["Password"];
$response = "";
//$responseArray=array();
//$responseArray["Email"]=$Email;
//$responseArray["Name"]=$Name;
//$responseArray["Password"]=$Password;
//$responseArray["Phone"]=$PhoneNumber;
if (!CheckEmail($Email))
    $response = "Пользователь с таким Email не найден";
else if (AddNewUser($Name, $PhoneNumber, $Email, $Password))
    $response = "Вы успешно зарегистрировались";
else
    $response = "Сожалеем, во время регистрации произола ошибка";

header("Content-Type:application/json");
echo json_encode($response);




