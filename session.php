<?php
session_start();
if ($_SESSION["rows"] == null)
    $_SESSION["rows"] = array();
else {
    header("Content-Type:application/json");
    echo json_encode($_SESSION);
}