document.addEventListener('DOMContentLoaded', function () {
    const points = document.querySelectorAll('.point');
    const infoBox = document.getElementById('info-box');
    const contentOverlay = document.getElementById('content-overlay');

    // Show tooltip on hover
    points.forEach(point => {
        // Show info on hover
        point.addEventListener('mouseenter', function (e) {
            if (infoBox) {
                const info = this.getAttribute('data-info');
                infoBox.textContent = info;
                infoBox.style.display = 'block';

                // Position the info box near the cursor but not directly under it
                infoBox.style.left = `${e.clientX + 15}px`;
                infoBox.style.top = `${e.clientY + 15}px`;
            }
        });

        // Hide info on mouse leave
        point.addEventListener('mouseleave', function () {
            if (infoBox) {
                infoBox.style.display = 'none';
            }
        });

        // Track mouse movement for tooltip
        point.addEventListener('mousemove', function (e) {
            if (infoBox && infoBox.style.display === 'block') {
                infoBox.style.left = `${e.clientX + 15}px`;
                infoBox.style.top = `${e.clientY + 15}px`;
            }
        });

        // Show detailed content on click
        point.addEventListener('click', function () {
            const content = this.getAttribute('data-content') || this.getAttribute('data-info');

            // Create the content container
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';

            // If there's detailed content (data-content), use it; otherwise, use data-info
            if (this.getAttribute('data-content')) {
                contentDiv.innerHTML = this.getAttribute('data-content');
            } else {
                contentDiv.innerHTML = `<p>${content}</p>
                                        <p>Detailed information not available for this location yet.</p>`;
            }

            // Add close button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = '×';
            closeBtn.addEventListener('click', closeContent);

            // Add escape key listener to close the overlay
            document.addEventListener('keydown', function escKeyHandler(e) {
                if (e.key === 'Escape') {
                    closeContent();
                    document.removeEventListener('keydown', escKeyHandler);
                }
            });

            // Clear previous content and show new
            contentOverlay.innerHTML = '';
            contentOverlay.appendChild(contentDiv);
            contentOverlay.appendChild(closeBtn);
            contentOverlay.classList.remove('hidden');

            // Add click outside listener
            contentOverlay.addEventListener('click', function outsideClickHandler(e) {
                if (e.target === contentOverlay) {
                    closeContent();
                    contentOverlay.removeEventListener('click', outsideClickHandler);
                }
            });

            // Automatically play audio if it exists (with a slight delay to ensure DOM is ready)
            setTimeout(() => {
                const audio = contentDiv.querySelector('audio');
                if (audio) {
                    audio.play().catch(error => {
                        console.log('Audio play failed:', error);
                        // Add a message if autoplay was blocked
                        if (error.name === 'NotAllowedError') {
                            const audioMsg = document.createElement('p');
                            audioMsg.className = 'audio-message';
                            audioMsg.textContent = 'Click play to listen to the song';
                            audio.parentNode.insertBefore(audioMsg, audio);
                        }
                    });
                }
            }, 300);
        });
    });

    // Function to close the content overlay
    function closeContent() {
        const contentDiv = contentOverlay.querySelector('.content');
        // Pause and reset any playing audio
        if (contentDiv) {
            const audio = contentDiv.querySelector('audio');
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }

        // Add a fade-out animation before hiding
        contentOverlay.classList.add('fade-out');
        setTimeout(() => {
            contentOverlay.classList.add('hidden');
            contentOverlay.classList.remove('fade-out');
            contentOverlay.innerHTML = ''; // Clear content
        }, 300);
    }

    // Add closing methods for overlay
    contentOverlay.addEventListener('click', function (e) {
        if (e.target === contentOverlay) {
            closeContent();
        }
    });
});


// Add this to your script.js file
function adjustPointSizeRelativeToMap() {
    const windowElement = document.querySelector('.window');
    const points = document.querySelectorAll('.point');

    // Get current map dimensions
    const mapWidth = windowElement.offsetWidth;
    const mapHeight = windowElement.offsetHeight;

    // Calculate point size as a percentage of map width (e.g., 4% of map width)
    // You can adjust this percentage to get the desired relative size
    const pointSizePercentage = 0.10;
    const pointSize = Math.round(mapWidth * pointSizePercentage);

    // Apply the calculated size to all points
    points.forEach(point => {
        point.style.width = `${pointSize}px`;
        point.style.height = `${pointSize}px`;
    });
}

// Run on page load and whenever window is resized
window.addEventListener('resize', adjustPointSizeRelativeToMap);
document.addEventListener('DOMContentLoaded', adjustPointSizeRelativeToMap);