<?php
// Connect to MySQL database
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

// Get player name and score from the request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playerName = $_POST["playerName"];
    $playerScore = $_POST["playerScore"];

    // Insert player name and score into the database
    $sql = "INSERT INTO whackamole (player_name, score) VALUES ('$playerName', '$playerScore')";

    if ($conn->query($sql) === TRUE) {
        echo "Score saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

