(function() {
    'use strict';

    // Mask CPU core count to a generic baseline
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });

    // Mask WebGL Vendor & Renderer to a common standard profile (Intel/NVIDIA)
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) return "Intel Open Source Technology Center";
        if (parameter === 37446) return "Mesa DRI Intel(R) UHD Graphics (ADL GT2)";
        return originalGetParameter.apply(this, arguments);
    };

    // Keep the working AudioContext noise filter from Run 4
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function() {
        const data = originalGetChannelData.apply(this, arguments);
        for (let i = 0; i < data.length; i += 100) {
            data[i] += (Math.random() - 0.5) * 1e-7;
        }
        return data;
    };
})();
