<?php
include("DataBaseConnect.php");

function AddNewUser($Name,$Surname, $Patronymic, $PhoneNumber, $Bio, $Birthday, $Email, $Password){
    $connection = connectDb();
    $query = "insert into users (Name, Surname, Patronymic, PhoneNumber, Bio, Birthday, Email, Password) value ("
        .$Name. "," .$Surname. "," .$Patronymic. "," .$PhoneNumber. "," .$Bio. "," .$Birthday. "," .$Email. "," .$Password. ");";
    $connection->query($query);

}



