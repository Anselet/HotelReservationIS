<?php
include ('SqlQueries.php');
session_start();

$first_date=$_POST["first_date"];
$second_date=$_POST["second_date"];
$category_Id=$_POST["category_Id"];
$user_Id=$_POST["user_Id"];

$result=bookRoom($first_date,$second_date,$category_Id,$user_Id);

header("Content-Type:application/json");
echo  json_encode($result);



