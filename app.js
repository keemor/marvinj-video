window.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvasInput = document.getElementById('canvasInput');
    const ctx = canvasInput.getContext('2d');

    const canvasOutput = document.getElementById('canvasOutput');

    canvasOutput.style.borderColor = 'red';

    const videoMode = navigator.maxTouchPoints > 1 ? { 'facingMode': { 'exact': 'environment' } } : true;

    const mediaConfig = {
        'video': videoMode
    };

    let image = new MarvinImage();
    let width, height;

    function setupView() {
        width = window.innerWidth;
        height = window.innerHeight;

        canvasInput.setAttribute('width', width);
        canvasInput.setAttribute('height', height);

        canvasOutput.setAttribute('width', width);
        canvasOutput.setAttribute('height', height);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
    }

    function loop() {
        let loopFrame = requestAnimationFrame(loop);
        ctx.save();
        // //ctx.globalAlpha = 0.05;
        ctx.drawImage(video, 0, 0, width, height);
        ctx.restore();

        image.load(canvasInput.toDataURL('image/png'), function() {
            //Marvin.colorChannel(image, image, 14, 0, -8);
            Marvin.grayScale(image, image);
            image.draw(canvasOutput);
        });
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setupView();
        canvasOutput.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                canvasOutput
                    .requestFullscreen()
                    .then({})
                    .catch(err => {
                        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                    });
            } else {
                document.exitFullscreen();
            }
            //https://stackoverflow.com/a/25322717/343900
            window.setTimeout(function() {
                setupView();
            }, 300);
        });

        window.addEventListener('orientationchange', function() {
            // https://stackoverflow.com/a/25322717/343900
            window.setTimeout(function() {
                setupView();
            }, 300);
        });

        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
            video.srcObject = stream;
        });

        //invoked once
        video.addEventListener('loadedmetadata', function() {
            loop();
        });
    }
});
