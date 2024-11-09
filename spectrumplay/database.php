<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_scores";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

// Select the database
$conn->select_db($dbname);

// SQL to create tables
$sql = "CREATE TABLE IF NOT EXISTS emotion_game (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    time_taken INT(6) NOT NULL
)";

// Execute query for emotion_game table
if ($conn->query($sql) === TRUE) {
    echo "Table emotion_game created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS whackamole (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    score INT(6) NOT NULL
)";

// Execute query for whackamole table
if ($conn->query($sql) === TRUE) {
    echo "Table whackamole created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE IF NOT EXISTS guess_word (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_Name VARCHAR(50) NOT NULL,
    player_Score INT(6) NOT NULL
)";

// Execute query for guess_word table
if ($conn->query($sql) === TRUE) {
    echo "Table guess_word created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// Add math_scores table
$sql = "CREATE TABLE IF NOT EXISTS math_scores (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    score INT(6) NOT NULL
)";

// Execute query for math_scores table
if ($conn->query($sql) === TRUE) {
    echo "Table math_scores created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// Close connection
$conn->close();

