document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');
    const videoContainer = document.querySelector('.video-container');
    const PlayAll = document.getElementById('PlayAll');
    let currentVideo = null; // Initially set to null

    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to autoplay the video currently in the viewport
    function autoplayVisibleVideo() {
        videos.forEach(video => {
            if (isElementInViewport(video)) {
                video.play();
                video.muted = false;
            } else {
                video.pause();
            }
        });
    }

    // Autoplay the videos when user clicks the PlayAll Button
    function playAllVideos() {
        videos.forEach(video => {
            video.play();
        });
    }



    videos.forEach(function (video) {
        video.addEventListener('click', () => {
            if (currentVideo && currentVideo !== video) {
                currentVideo.pause(); // Pause the currently playing video
            }
            currentVideo = video; // Set the currentVideo to the clicked video

            if (video.paused) {
                video.play(); // Play the video if it's paused
                video.setAttribute('controls', ''); // Show controls when video is played
            } else {
                video.pause(); // Pause the video if it's playing
                video.removeAttribute('controls'); // Hide controls when video is paused
            }
            // Set the background color of the video container to match the current video
            videoContainer.style.backgroundColor = video.style.backgroundColor;
        });

        video.addEventListener('play', () => {
            // Pause all other videos when a video starts playing
            videos.forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.removeAttribute('controls'); // Remove controls from other videos
                }
            });
            // Set the background color of the video container to match the current video
            videoContainer.style.backgroundColor = video.style.backgroundColor;
        });

        // Prevent default behavior (e.g., fullscreen) when clicking on the video
        video.addEventListener('click', (e) => {
            e.preventDefault();
        });

        // Set the poster image to the first frame of the video
        video.addEventListener('loadedmetadata', function () {
            // Capture the first frame of the video
            const canvas = document.createElement('canvas');
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

            // Convert canvas to base64 data URL and set as poster attribute
            const posterData = canvas.toDataURL('image/jpeg');
            this.setAttribute('poster', posterData);
        });

        // Optional: Remove controls for now, they will be added when the video is played
        video.removeAttribute('controls');

        // Add event listener to the autoplay button
        PlayAll.addEventListener('click', playAllVideos);

        // Autoplay the video currently in the viewport on page load
        autoplayVisibleVideo();

        // Check for the video in the viewport on scroll
        window.addEventListener('scroll', autoplayVisibleVideo);
    });


});
