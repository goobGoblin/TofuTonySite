document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');
    const videoContainer = document.querySelector('.video-container');
    let currentVideo = null; // Initially set to null

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
    });
    
    // Automatically trigger click event on each video to start playback after the event listeners are defined
    videos.forEach(function (video) {
        video.click();
    });
    
});
