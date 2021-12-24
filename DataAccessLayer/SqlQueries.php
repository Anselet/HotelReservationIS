<?php
include("DataBaseConnect.php");

class user{
    public $Id;
    public $Name;
    public $Email;
    public $Phone;
}
class order{
    public $Id;
    public $room_name;
    public $first_date;
    public $second_date;

    /**
     * @param $Id
     * @param $room_name
     * @param $first_date
     * @param $second_date
     */
    public function __construct($Id, $room_name, $first_date, $second_date)
    {
        $this->Id = $Id;
        $this->room_name = $room_name;
        $this->first_date = $first_date;
        $this->second_date = $second_date;
    }

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

function bookRoom($first_date, $second_date,$categoryId, $userId){
    $connection = connectDb();
    $query = "Select number from rooms where category='".$categoryId."' and isFree=1 LIMIT 1;";
    if($res=$connection->query($query)){
        $col=$res->fetch_row();
        $room_number = $col[0];
        $res->close();
    } else return 0;
    $query ="UPDATE rooms set isFree=0 where number ='".$room_number."';";
    if(!$connection->query($query))
        return 0;
    $query = "INSERT orders (Room, User, DateStart, DateEnd) VALUE (".$room_number.",".$userId.",'".$first_date."','".$second_date."');";
    if(!$connection->query($query))
        return 0;
    return 1;
}

function getUserOrders($Id){
    $connection=connectDb();
    $response = array();
    $query ="select orders.Id,Name,DateStart,DateEnd from orders left join rooms r on r.number = orders.Room
            left join categories c on c.Id = r.category
            where User=".$Id.";";
    if($res=$connection->query($query)) {

                while ($column = $res->fetch_row()) {
                    $response[] = new order($column[0],$column[1],$column[2],$column[3]);
                }
                $res->close();
            } else return 2;
    return $response;
}

//echo getUserInfo("anton99910@gmail.com")->Name;

//bookRoom("20.12.2021","02.01.2022",3,7);
// echo getUserOrders(1);

