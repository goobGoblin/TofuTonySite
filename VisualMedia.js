const videos = document.querySelectorAll('video');
const videoContainer = document.querySelector('.video-container');
let currentVideo = null; // Initially set to null

videos.forEach(video => {
    video.addEventListener('click', () => {
        if (currentVideo && currentVideo !== video) {
            currentVideo.pause(); // Pause the previously playing video
            currentVideo.removeAttribute('controls'); // Remove controls from previously playing video
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
});
