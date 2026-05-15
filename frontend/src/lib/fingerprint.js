export function computeEntropy(sig) {
    let score = 0.0;
    const r = (sig.renderer || "").toLowerCase();
    
    // Target model specificity flags (NVIDIA, AMD, Apple Silicon spikes)
    if (r.includes("rtx") || r.includes("radeon rx")) score += 0.15;
    if (r.includes("m1") || r.includes("m2") || r.includes("m3") || r.includes("apple")) score += 0.28;
    if (r.length > 40) score += 0.12; // model-specific abstraction leak
    
    // Compute density anomalies (unusual compute limits)
    if (sig.hardware_concurrency >= 16) score += 0.18;
    if (sig.hardware_concurrency <= 2) score += 0.20; // highly telegraphed profiles

    return Math.min(1.0, Math.max(0.0, score));
}
