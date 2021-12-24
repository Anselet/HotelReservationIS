<?php
include ("SqlQueries.php");
session_start();

$Id= $_POST["Id"];

$result=getUserOrders($Id);


header("Content-Type:application/json");
echo json_encode($result);
