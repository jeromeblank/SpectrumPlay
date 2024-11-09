document.addEventListener("DOMContentLoaded", function() {
    const emojis = ["😊","😊","😂","😂","😍","😍","😒","😒","👌","👌","😘","😘","😎","😎","🔥","🔥"];
    var shuf_emojis = emojis.sort(() => Math.random() - 0.5);
    var opened = [];
    var startTime = Date.now();
    var timerInterval;
    var selectedIndex = 0;

    function updateTimer() {
        var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('time').textContent = elapsedTime;
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(updateTimer, 1000);

    for (var i = 0; i < emojis.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuf_emojis[i];
        box.setAttribute('data-emoji', shuf_emojis[i]);
        box.setAttribute('data-index', i);
        box.setAttribute('tabindex', '0'); // Make the box focusable

        box.onclick = function() {
            // Play the background music when the user clicks on any game box
            var backgroundMusic = document.getElementById('backgroundMusic');
            backgroundMusic.play();

            if (!this.classList.contains('boxMatch') && !this.classList.contains('boxOpen') && opened.length < 2) {
                this.classList.add('boxOpen');
                opened.push(this);
                if (opened.length == 2) {
                    if (opened[0].getAttribute('data-emoji') === opened[1].getAttribute('data-emoji')) {
                        opened[0].classList.add('boxMatch');
                        opened[1].classList.add('boxMatch');
                        opened = [];
                        if (document.querySelectorAll('.boxMatch').length == emojis.length) {
                            stopTimer();
                            var timeTaken = document.getElementById('time').textContent;
                            var playerName = prompt("Enter your name:");
                            saveScore(playerName, timeTaken);
                            alert(playerName + ', you win! Time taken: ' + timeTaken + ' seconds');
                        }
                    } else {
                        setTimeout(function() {
                            opened[0].classList.remove('boxOpen');
                            opened[1].classList.remove('boxOpen');
                            opened = [];
                        }, 500);
                    }
                }
            }
        };

        document.querySelector('.game').appendChild(box);
    }

    document.querySelector('.reset').addEventListener('click', function() {
        window.location.reload();
    });

    document.addEventListener('keydown', function(event) {
        const boxes = document.querySelectorAll('.item');
        const numRows = 4; // Assuming 4 rows in the grid
        const numCols = emojis.length / numRows;
        if (event.key === 'ArrowRight') {
            selectedIndex = (selectedIndex + 1) % emojis.length;
        } else if (event.key === 'ArrowLeft') {
            selectedIndex = (selectedIndex - 1 + emojis.length) % emojis.length;
        } else if (event.key === 'ArrowDown') {
            selectedIndex = (selectedIndex + numCols) % emojis.length;
        } else if (event.key === 'ArrowUp') {
            selectedIndex = (selectedIndex - numCols + emojis.length) % emojis.length;
        } else if (event.key === 'Enter') {
            const selectedBox = document.querySelector('.item:focus');
            if (selectedBox && !selectedBox.classList.contains('boxMatch') && !selectedBox.classList.contains('boxOpen') && opened.length < 2) {
                selectedBox.classList.add('boxOpen');
                opened.push(selectedBox);
                if (opened.length == 2) {
                    if (opened[0].getAttribute('data-emoji') === opened[1].getAttribute('data-emoji')) {
                        opened[0].classList.add('boxMatch');
                        opened[1].classList.add('boxMatch');
                        opened = [];
                        if (document.querySelectorAll('.boxMatch').length == emojis.length) {
                            stopTimer();
                            var timeTaken = document.getElementById('time').textContent;
                            var playerName = prompt("Enter your name:");
                            saveScore(playerName, timeTaken);
                            alert(playerName + ', you win! Time taken: ' + timeTaken + ' seconds');
                        }
                    } else {
                        setTimeout(function() {
                            opened[0].classList.remove('boxOpen');
                            opened[1].classList.remove('boxOpen');
                            opened = [];
                        }, 500);
                    }
                }
            }
        }
        boxes[selectedIndex].focus();
    });

    // Function to send data to PHP script for saving score
    function saveScore(playerName, timeTaken) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "save_score.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        xhr.send("playerName=" + playerName + "&timeTaken=" + timeTaken);
    }
});
