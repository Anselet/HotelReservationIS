<?php
include("DataBaseConnect.php");

class user{
    public $Id;
    public $Name;
    public $Email;
    public $Phone;
}

function AddNewUser($Name, $PhoneNumber, $Email, $Password){
    $connection = connectDb();
    $query = "insert into users (Name, PhoneNumber,  Email, Password) value ('"
        .$Name.  "','" .$PhoneNumber."','" .$Email. "','" .$Password. "');";
    return $connection->query($query);

}

function CheckEmail($Email){
    $connection = connectDb();
    $query = "Select count(*) from users where Email='".$Email."'" ;
    if($res=$connection->query($query)){
        if( $res->fetch_row()[0]== 0)
            return 0;
        else
            return 1;
    }

}

function getUserPassword($Email){
    $connection = connectDb();
    $query = "Select Password from users where Email='".$Email."'" ;
    if($res=$connection->query($query)){
         return $res->fetch_row()[0];
    }
}

function getUserInfo($Email){
    $user = new user();
    $connection = connectDb();
    $query = "Select Id, NAME, Email, PhoneNumber from users where Email='".$Email."'" ;
    if($res=$connection->query($query)){
        $col=$res->fetch_row();
        $user->Id=$col[0];
        $user->Name=$col[1];
        $user->Email=$col[2];
        $user->Phone=$col[3];
    }
    return $user;
}

//echo getUserInfo("anton99910@gmail.com")->Name;


