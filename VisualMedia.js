document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video:not(#background-video)');
    const videoContainer = document.querySelector('.video-container');
    const PlayAll = document.getElementById('PlayAll');
    let currentVideo = findActiveVideo(); // Initially set to null

    // Function to find the active video
     function findActiveVideo() {
         for (let i = 0; i < videos.length; i++) {
             if (videos[i].classList.contains('active')) {
                 if (i == 0) {
                   videos[i].classList.add('background');
                   videos[i].classList.remove('active');
                 }
                 return videos[i];
             }
         }
         return null;
     }
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
                video.classList.add('active');
                video.muted = false;
            } else {
                video.classList.remove('active');
                video.pause();
            }
        });
    }

    // Autoplay the videos when user clicks the PlayAll Button
    function playAllVideos() {
        videos.forEach(video => {
            video.play();
            if (index === 0) {
               video.classList.add('active');
           } else {
               video.classList.remove('active');
           }
        });
    }

    // Function to play or pause a video when clicked
    function toggleVideoPlayback(video) {
        if (video.paused) {
            video.play();
            video.classList.add('active');
        } else {
            video.pause();
            video.classList.remove('active');
        }
    }

    videos.forEach(function (video) {
        video.addEventListener('click', () => {
            toggleVideoPlayback(video);
            if (currentVideo && currentVideo !== video) {
                currentVideo.pause(); // Pause the currently playing video
                video.classList.add('active');
                currentVideo.classList.remove('active');
            }
            currentVideo = video; // Set the currentVideo to the clicked video
            // Set the background color of the video container to match the current video
            videoContainer.style.backgroundColor = video.style.backgroundColor;
        });

        // Prevent default behavior (e.g., fullscreen) when clicking on the video
        video.addEventListener('click', (e) => {
            e.preventDefault();
        });

        // Optional: Remove controls for now, they will be added when the video is played
        video.removeAttribute('controls');

        // Add event listener to the autoplay button
        PlayAll.addEventListener('click', playAllVideos);

        // Check for the video in the viewport on scroll
        window.addEventListener('scroll', autoplayVisibleVideo);

        // Autoplay the video currently in the viewport on page load
        autoplayVisibleVideo();

        // Play the currently active video
        if (currentVideo) {
            currentVideo.play();
        }

    });


});
