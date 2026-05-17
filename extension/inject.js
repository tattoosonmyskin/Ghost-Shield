(function() {
    'use strict';
    
    const poison = () => (Math.random() > 0.5 ? 1 : -1);

    // 1. Mask Basic Hardware Metrics
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });

    // 2. Overwrite WebGL Parametric Footprint
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) return "Intel Open Source Technology Center";
        if (parameter === 37446) return "Mesa DRI Intel(R) UHD Graphics (ADL GT2)";
        return originalGetParameter.apply(this, arguments);
    };

    // 3. Close the WebGL Canvas Leak (Intercepting readPixels texture extraction)
    const originalReadPixels = WebGLRenderingContext.prototype.readPixels;
    WebGLRenderingContext.prototype.readPixels = function(x, y, width, height, format, type, pixels) {
        originalReadPixels.apply(this, arguments);
        if (pixels && pixels.length > 0) {
            // Inject low-frequency noise directly into the WebGL buffer array
            pixels[0] = pixels[0] ^ 1; 
        }
    };

    // 4. Close the 2D Canvas Leak (Intercepting putImageData tracking routines)
    const originalPutImageData = CanvasRenderingContext2D.prototype.putImageData;
    CanvasRenderingContext2D.prototype.putImageData = function(imageData, dx, dy) {
        if (imageData && imageData.data.length > 0) {
            // Jitter the pixel data array before it renders to the screen
            imageData.data[0] = imageData.data[0] ^ poison();
        }
        return originalPutImageData.apply(this, arguments);
    };

    // 5. Secure AudioContext Frequency Responses
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function() {
        const data = originalGetChannelData.apply(this, arguments);
        for (let i = 0; i < data.length; i += 100) {
            data[i] += (Math.random() - 0.5) * 1e-7;
        }
        return data;
    };
})();
