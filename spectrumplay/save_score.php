<?php
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
$stmt = $conn->prepare("INSERT INTO emotion_game (player_name, time_taken) VALUES (?, ?)");
$stmt->bind_param("si", $playerName, $timeTaken);

// Set parameters and execute
$playerName = $_POST["playerName"];
$timeTaken = $_POST["timeTaken"];
$stmt->execute();

echo "New record inserted successfully";

$stmt->close();
$conn->close();