(function() {
    const poison = () => (Math.random() > 0.5 ? 1 : -1);
    
    // Total Canvas Overwrite: getImageData, toDataURL, and toBlob
    const wrap = (obj, prop, wrapper) => {
        const original = obj[prop];
        obj[prop] = function() {
            return wrapper.apply(this, [original, arguments]);
        };
    };

    // Poison 2D Context readback
    wrap(CanvasRenderingContext2D.prototype, 'getImageData', function(orig, args) {
        const image = orig.apply(this, args);
        image.data[0] = image.data[0] ^ poison(); // 1-bit stochastic jitter
        return image;
    });

    // Poison string-based readback (toDataURL/toBlob)
    // We subtly draw a nearly-invisible pixel before every export
    const distort = (canvas) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const val = ctx.getImageData(0, 0, 1, 1);
            val.data[0] = val.data[0] ^ poison();
            ctx.putImageData(val, 0, 0);
        }
    };

    wrap(HTMLCanvasElement.prototype, 'toDataURL', function(orig, args) {
        distort(this);
        return orig.apply(this, args);
    });

    wrap(HTMLCanvasElement.prototype, 'toBlob', function(orig, args) {
        distort(this);
        return orig.apply(this, args);
    });

    // Poison AudioContext Frequency response
    wrap(AudioBuffer.prototype, 'getChannelData', function(orig, args) {
        const data = orig.apply(this, args);
        for (let i = 0; i < data.length; i += 100) {
            data[i] += (Math.random() - 0.5) * 1e-7;
        }
        return data;
    });
})();
