(function() {
    'use strict';
    
    const poison = () => (Math.random() > 0.5 ? 1 : -1);

    // Hard-coded hardware spec overrides (Verified successful in Run 5)
    Object.defineProperty(navigator, 'hardwareConcurrency', { 
        value: 4, configurable: false, enumerable: true, writable: false 
    });
    Object.defineProperty(navigator, 'deviceMemory', { 
        value: 8, configurable: false, enumerable: true, writable: false 
    });

    // Immutable WebGL Vendor & Renderer Overrides
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    Object.defineProperty(WebGLRenderingContext.prototype, 'getParameter', {
        value: function(parameter) {
            if (parameter === 37445) return "Intel Open Source Technology Center";
            if (parameter === 37446) return "Mesa DRI Intel(R) UHD Graphics (ADL GT2)";
            return originalGetParameter.apply(this, arguments);
        },
        configurable: false, writable: false
    });

    // Close the toDataURL Leak via Immutable Descriptors
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
        value: function() {
            const ctx = this.getContext('2d');
            if (ctx) {
                const shift = ctx.getImageData(0, 0, 1, 1);
                shift.data[0] = shift.data[0] ^ 1;
                ctx.putImageData(shift, 0, 0);
            }
            return originalToDataURL.apply(this, arguments);
        },
        configurable: false, writable: false
    });

    // Close the WebGL ReadPixels Texture leak path
    const originalReadPixels = WebGLRenderingContext.prototype.readPixels;
    Object.defineProperty(WebGLRenderingContext.prototype, 'readPixels', {
        value: function(x, y, width, height, format, type, pixels) {
            originalReadPixels.apply(this, arguments);
            if (pixels && pixels.length > 0) {
                pixels[0] = pixels[0] ^ 1;
            }
        },
        configurable: false, writable: false
    });

    // Immutable AudioContext Filter (Verified successful in Run 4 & 5)
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    Object.defineProperty(AudioBuffer.prototype, 'getChannelData', {
        value: function() {
            const data = originalGetChannelData.apply(this, arguments);
            for (let i = 0; i < data.length; i += 100) {
                data[i] += (Math.random() - 0.5) * 1e-7;
            }
            return data;
        },
        configurable: false, writable: false
    });
})();
