<?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "contact";
        try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully <br />";
        }
        catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }
        $query=$conn->prepare("INSERT INTO messages (name, email, phone_number, message) VALUES
        (?,?,?,?)");
        $query->bindParam(1,$name);
        $query->bindParam(2,$email);
        $query->bindParam(3,$phone_number);
        $query->bindParam(4,$message);
        $name=$_POST['name'];
        $email=$_POST['email'];
        $phone_number=$_POST['phone_number'];
        $message=$_POST['message'];
        $query->execute();
        $conn = null;
        echo 'Hi '.$_POST['name'] .' thanks for contacting us.</br>';
        echo 'We will get back to you either at '. $_POST['email'].'<br /> or call you on '.$_POST['phone_number'].' soon.</br>';

?>