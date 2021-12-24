<?php
$servername = "159.89.14.28";
$username = "remoteUser";
$password = "Qwe123!@#";

function connectDb(){
// Create connection
$conn = new mysqli($GLOBALS['servername'], $GLOBALS["username"], $GLOBALS["password"],"booking");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
return $conn;
}



