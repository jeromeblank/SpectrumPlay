
<?php

$playerName = $_POST['playerName'];
$playerScore = $_POST['playerScore'];


$servername = "localhost";
$username = "id22117769_alexcantos";
$password = "@lexandeR81703";
$dbname = "id22117769_user_scores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind the INSERT statement
$sql = ("INSERT INTO guess_word (player_Name, player_Score) VALUES ('$playerName', $playerScore)");

if ($conn->query($sql) === TRUE) {
    echo "New record inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}



$conn->close();
?>