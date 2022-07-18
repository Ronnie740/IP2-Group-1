<?php
$servername="localhost";
$username="root";
$password="";
$dbname="contact";

try{

    $conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
    $conn -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";

}
catch(PDOException $e){

    echo "Connection failed: " . $e->getMessage();

}
$query=$conn->prepare("CREATE TABLE messages (id int(6) NOT NULL
auto_increment,name varchar(20) NOT NULL,email varchar(30) NOT NULL,phone_number int(15) NOT NULL,message varchar(30) NOT NULL,PRIMARY
KEY (id),UNIQUE id (id),KEY id_2 (id))");

$query -> execute();
$conn = null;

?>