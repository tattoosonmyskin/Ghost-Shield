export async function runBurnSequence(backendUrl) {
    // Generate isolated drawing context to poison hardware signatures
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.cssText = "position:fixed; opacity:0.001; pointer-events:none; z-index:-1;";
    document.body.appendChild(canvas);
    
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const start = Date.now();
    const duration = 8000; // 8-second execution window

    while (Date.now() - start < duration) {
        // High-precision math randomizers to fill rendering pipelines
        gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // Generate network noise to scramble performance observers
        fetch(`${backendUrl}/burn/sink`, { method: 'HEAD', mode: 'no-cors' }).catch(() => {});
        
        // Thermal Governor delay step
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
}
