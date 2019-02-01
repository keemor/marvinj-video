window.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvasInput = document.getElementById('canvasInput');
    const ctx = canvasInput.getContext('2d');

    const canvasOutput = document.getElementById('canvasOutput');

    canvasOutput.style.borderColor = 'white';

    const videoMode = navigator.maxTouchPoints > 1 ? { 'facingMode': { 'exact': 'environment' } } : true;

    const mediaConfig = {
        'video': videoMode
    };

    let image = new MarvinImage();
    const width = window.innerWidth;
    console.log('width: ', width);
    const height = window.innerHeight;
    console.log('height: ', height);

    canvasInput.setAttribute('width', width);
    canvasInput.setAttribute('height', height);

    canvasOutput.setAttribute('width', width);
    canvasOutput.setAttribute('height', height);

    video.setAttribute('width', width);
    video.setAttribute('height', height);

    function loop() {
        let loopFrame = requestAnimationFrame(loop);
        ctx.save();
        // //ctx.globalAlpha = 0.05;
        ctx.drawImage(video, 0, 0, width, height);
        ctx.restore();

        image.load(canvasInput.toDataURL('image/png'), function() {
            let imageOut = new MarvinImage(image.getWidth(), image.getHeight());
            //let imageOut = new MarvinImage(300, 400);
            //Marvin.blackAndWhite(image, imageOut, 30);
            Marvin.colorChannel(image, imageOut, 14, 0, -8);
            //image.clear(0xFF000000);
            //Marvin.prewitt(image, imageOut);
            //Marvin.thresholding(image, imageOut, 180);
            //Marvin.gaussianBlur(image, imageOut, 7.0);
            //Marvin.invert(image, imageOut);
            //Marvin.invertColors(image, image);
            //Marvin.thresholding(image, image, 150);
            imageOut.draw(canvasOutput);
        });
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
