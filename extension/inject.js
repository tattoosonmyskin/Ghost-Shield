const generateHex = () => '0x' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => Math.floor(Math.random() * 8) + 2 });
Object.defineProperty(navigator, 'deviceMemory', { get: () => 16 });

const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(p) {
    if (p === 0x9245) return "Ghost Engine Virtualized Interface";
    if (p === 0x9246) return `Sovereign_GPU_MUX [${generateHex()}]`;
    return originalGetParameter.apply(this, arguments);
};

// Ghost-Shield: High-Entropy Vector Inversion [0x00000000bd6a2500]
(function() {
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function(x, y, w, h) {
        const imageData = originalGetImageData.apply(this, arguments);
        // Mutate 1-bit of stochastic noise in the first pixel buffer
        // This alters the CRC32 Hash without inducing visible UI disfluency
        imageData.data[0] = imageData.data[0] ^ (Math.random() > 0.5 ? 1 : 0);
        return imageData;
    };

    // Obfuscate AudioBuffer Channel Data (The 'Voice' vector)
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function() {
        const data = originalGetChannelData.apply(this, arguments);
        for (let i = 0; i < data.length; i += 100) {
            data[i] += (Math.random() - 0.5) * 1e-7; // Basal entropy injection
        }
        return data;
    };
})();
