<?php
include("DataBaseConnect.php");
function AddNewUser($Name, $PhoneNumber, $Email, $Password){
    $connection = connectDb();
    $query = "insert into users (Name, PhoneNumber,  Email, Password) value ("
        .$Name.  "," .$PhoneNumber."," .$Email. "," .$Password. ");";
    return $connection->query($query);

}

function CheckEmail($Email){
    $connection = connectDb();
    $query = "Select count(*) from users where Email=".$Email ;
    if($res=$connection->query($query)){
        if( $res->fetch_row()[0]== 0)
            return 0;
        else
            return 1;
    }

}


