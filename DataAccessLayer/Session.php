<?php
include ("SqlQueries.php");
session_start();

if ($_SESSION["User"] != null){
    header("Content-Type:application/json");
    echo json_encode($_SESSION);
}