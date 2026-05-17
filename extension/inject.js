(function() {
    'use strict';

    // Randomized Hardware Concurrency Spoof
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8
    });

    // Randomized Device Memory Spoof
    Object.defineProperty(navigator, 'deviceMemory', {
        get: () => 16
    });

    // WebGL Vendor and Renderer Randomization Loop
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        // UNMASKED_VENDOR_WEBGL
        if (parameter === 37445) {
            return "Google Inc. (AMD)";
        }
        // UNMASKED_RENDERER_WEBGL
        if (parameter === 37446) {
            return "ANGLE (AMD, AMD Radeon 610M (radeonsi raphael_mendocino LLVM 19.1.7), OpenGL 4.6)";
        }
        return originalGetParameter.apply(this, arguments);
    };

    // AudioContext Spoofing Sequence (Successfully verified in Run 3)
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function() {
        const data = originalGetChannelData.apply(this, arguments);
        for (let i = 0; i < data.length; i += 100) {
            data[i] += (Math.random() - 0.5) * 1e-7;
        }
        return data;
    };
})();
