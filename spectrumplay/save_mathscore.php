<?php
// Database connection parameters
$servername = "localhost";
$username = "id22117769_alexcantos";
$password = "@lexandeR81703";
$dbname = "id22117769_user_scores";


// Get the POST data sent by the JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Extract the user name and total score from the POST data
$userName = $data['userName'];
$totalScore = $data['totalScore'];

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to insert the data into the math_scores table
$sql = "INSERT INTO math_scores (player_name, score) VALUES ('$userName', $totalScore)";

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
    echo "Score recorded successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();

