<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="games.css">
    <title>SPECTRUM Games</title>
</head>
<body>
    <nav>
        <div class="nav_logo"><a href="#">SpectrumPlay</a></div>
        <ul class="nav_links">
            <li class="link"><a href="index.html">Home</a></li>
            <li class="link"><a href="games.html">Games</a></li>
            <li class="link"><a href="#">Scores</a></li>
            <button class="enlarge_btn">Aa</button>
        </ul>
    </nav>

    <div class="score-table">
        <h2>Emotion Game Scores</h2>
        <table>
            <tr>
                <th>Player Name</th>
                <th>Time Taken</th>
            </tr>
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

            // Select data from table ordered by time_taken
            $sql = "SELECT player_name, time_taken FROM emotion_game ORDER BY time_taken ASC";
            $result = $conn->query($sql);

            // Check if there are results
            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["player_name"]. "</td><td>" . $row["time_taken"]. "</td></tr>";
                }
            } else {
                echo "<tr><td colspan='2'>0 results</td></tr>";
            }

            $conn->close();
            ?>
        </table>
    </div>

    <div class="score-table">
        <h2>Math Game Scores</h2>
        <table>
            <tr>
                <th>Player Name</th>
                <th>Score</th>
            </tr>
            <?php
            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Select data from table ordered by score
            $sql = "SELECT player_name, score FROM math_scores ORDER BY score DESC";
            $result = $conn->query($sql);

            // Check if there are results
            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["player_name"]. "</td><td>" . $row["score"]. "</td></tr>";
                }
            } else {
                echo "<tr><td colspan='2'>0 results</td></tr>";
            }

            $conn->close();
            ?>
        </table>
    </div>

    <div class="score-table">
        <h2>Guess Word Game Scores</h2>
        <table>
            <tr>
                <th>Player Name</th>
                <th>Score</th>
            </tr>
            <?php
            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Select data from table ordered by score
            $sql = "SELECT player_Name, player_Score FROM guess_word ORDER BY player_Score DESC";
            $result = $conn->query($sql);

            // Check if there are results
            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["player_Name"]. "</td><td>" . $row["player_Score"]. "</td></tr>";
                }
            } else {
                echo "<tr><td colspan='2'>0 results</td></tr>";
            }

            $conn->close();
            ?>
        </table>
    </div>

    <div class="score-table">
        <h2>Whack-a-Mole Game Scores</h2>
        <table>
            <tr>
                <th>Player Name</th>
                <th>Score</th>
            </tr>
            <?php
            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Select data from table ordered by score
            $sql = "SELECT player_name, score FROM whackamole ORDER BY score DESC";
            $result = $conn->query($sql);

            // Check if there are results
            if ($result->num_rows > 0) {
                // Output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["player_name"]. "</td><td>" . $row["score"]. "</td></tr>";
                }
            } else {
                echo "<tr><td colspan='2'>0 results</td></tr>";
            }

            $conn->close();
            ?>
        </table>
    </div>

    <footer>
        <div class="copyright">
            <p>&copy; 2024 Spectrum Play. All rights reserved.</p>
        </div>
    </footer>
    <script src="index.js"></script>
</body>
</html>
