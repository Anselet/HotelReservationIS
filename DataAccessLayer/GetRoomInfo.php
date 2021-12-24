<?php
include ("DataBaseConnect.php");

$id= $_GET["Id"];


class roomInfo
{
    public $Name;
    public $Price;
    public $FreePlaces;
    public $facilities = array();
    public function __construct($Name,$Price){
        $this->Name=$Name;
        $this->Price=$Price;
    }
}
$info = null;
$connection = connectDb();
$query = "SELECT Name, Price from categories where Id=".$id.";";


if ($connection->multi_query($query)) {
       if ($result = $connection->use_result()) {
            while ($column = $result->fetch_row()) {
                $info= new roomInfo($column[0],$column[1]);
            }
            $result->close();
        }
}
$query1 = "Select count(*) from rooms where category=".$id." and isFree=1;";
if($connection->multi_query($query1)){
    if($res=$connection->use_result()){
        $col=$res->fetch_row();
        $info->FreePlaces=$col[0];
    }
    $res->close();
}

$query2 = "Select Name from categoryFacilities left join facilities f on f.Id = categoryFacilities.facilitiesId where categoryId =".$id.";";

if($connection->multi_query($query2)){
    if($res=$connection->use_result()){
        while($col=$res->fetch_row()){
            $info->facilities[] = $col[0];
        }
    }
    $res->close();
}


header("Content-Type:application/json");
echo  json_encode($info);