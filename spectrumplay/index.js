document.addEventListener('DOMContentLoaded', function() {
    const enlargeButton = document.querySelector('.enlarge_btn');
    const hoverSound = document.getElementById('hoverSound'); // Get the audio element
    let isTextEnlarged = false; // Track whether text is currently enlarged
    
    // Function to play sound
    function playHoverSound() {
        hoverSound.currentTime = 0; // Reset sound to start
        hoverSound.play();
    }

    // Attach event listener to each navigation link
    const navLinks = document.querySelectorAll('.link a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', playHoverSound);
    });

    // Attach event listener to the SpectrumPlay logo
    const logoLink = document.querySelector('.nav_logo a');
    logoLink.addEventListener('click', function(event) {
        // Prevent the default action of the link (e.g., page reload)
        event.preventDefault();
        
    
        document.body.style.backgroundColor = getRandomColor();
    });

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    enlargeButton.addEventListener('click', function() {
        const allTextElements = document.querySelectorAll('body *');
        
        if (isTextEnlarged) {
            // If text is currently enlarged, reset font sizes to default
            allTextElements.forEach(function(element) {
                element.style.fontSize = '';
            });
            isTextEnlarged = false; // Update state
        } else {
            // If text is not currently enlarged, increase font sizes
            allTextElements.forEach(function(element) {
                // Get the computed font size and convert it to a number
                const computedFontSize = window.getComputedStyle(element).getPropertyValue('font-size');
                const currentFontSize = parseFloat(computedFontSize);
                // Increase the font size by a certain factor (e.g., 1.2 times)
                const newFontSize = currentFontSize * 1.2;
                // Set the new font size to the element
                element.style.fontSize = newFontSize + 'px';
            });
            isTextEnlarged = true; // Update state
        }
    });

    // Slideshow functionality
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    // Play Games button functionality
    const playGamesButton = document.getElementById("playGamesButton");
    playGamesButton.addEventListener("click", function() {
        // Array of HTML files
        var htmlFiles = [
            "g1.html",
            "g2.html",
            "g3.html",
            "math.html"
        ];

        // Get a random index
        var randomIndex = Math.floor(Math.random() * htmlFiles.length);

        // Redirect to the random HTML file
        window.location.href = htmlFiles[randomIndex];
    });

    // Fade-in and slide-in functionality on scroll
    window.addEventListener("scroll", function() {
        var fadeInElements = document.querySelectorAll(".fade-in");
        var slideInElements = document.querySelectorAll(".slide-in");

        fadeInElements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.style.opacity = 1;
            }
        });

        slideInElements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add("active");
            }
        });
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
