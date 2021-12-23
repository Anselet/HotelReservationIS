<?php
include ("DataBaseConnect.php");

class category
{
 public $Name;
 public $Price;

 public function __construct($Name,$Price){
    $this->Name=$Name;
    $this->Price=$Price;
}
}
$categories = array();



$connection = connectDb();
$query = "SELECT Id,Name,Price from categories;";


if ($connection->multi_query($query)) {
    do {
        /* получаем первый результирующий набор */
        if ($result = $connection->use_result()) {
            while ($column = $result->fetch_row()) {
                $categories[$column[0]]= new category($column[1],$column[2]);
                            }
            $result->close();
        }
        /* печатаем разделитель */
        if ($connection->more_results()) {
            printf("-----------------\n");
        }
    } while ($connection->next_result());}

header("Content-Type:application/json");
echo  json_encode($categories);