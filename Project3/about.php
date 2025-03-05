<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $con = mysqli_connect('localhost', 'root', '', 'photography');
    
    if ($con) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $number = $_POST['number'];

        $query = "INSERT INTO photography (name, email, number) VALUES ('$name', '$email', '$number')";
        if (mysqli_query($con, $query)) {
            echo "Data inserted successfully!";
            header('Location: index.php#contact');
            exit(); 
        } else {
            echo "Error: " . mysqli_error($con);
        }
    } else {
        echo "Connection Failed";
    }
}
?>
