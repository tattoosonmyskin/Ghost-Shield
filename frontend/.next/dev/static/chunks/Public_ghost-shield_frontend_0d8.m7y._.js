(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Public/ghost-shield/frontend/src/lib/fingerprint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeEntropy",
    ()=>computeEntropy
]);
function computeEntropy(sig) {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Public/ghost-shield/frontend/src/lib/burn.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runBurnSequence",
    ()=>runBurnSequence
]);
async function runBurnSequence(backendUrl) {
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
    while(Date.now() - start < duration){
        // High-precision math randomizers to fill rendering pipelines
        gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Generate network noise to scramble performance observers
        fetch(`${backendUrl}/burn/sink`, {
            method: 'HEAD',
            mode: 'no-cors'
        }).catch(()=>{});
        // Thermal Governor delay step
        await new Promise((resolve)=>setTimeout(resolve, 50));
    }
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GhostAuditEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$fingerprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/lib/fingerprint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$burn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/lib/burn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function GhostAuditEngine() {
    _s();
    const [sig, setSig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        renderer: 'INITIALIZING FILE SYSTEMS...',
        cores: 0,
        memory: 0,
        entropy: 0.0
    });
    const [autonomous, setAutonomous] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addressStream, setAddressStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // 1. Hardware Fingerprint Initialization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostAuditEngine.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            let renderer = "UNKNOWN_PIPELINE";
            let vendor = "UNKNOWN_VENDOR";
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                }
            }
            const signature = {
                renderer,
                vendor,
                hardware_concurrency: navigator.hardwareConcurrency || 4,
                device_memory: navigator.deviceMemory || 4.0
            };
            const entropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$fingerprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeEntropy"])(signature);
            setSig({
                ...signature,
                entropy
            });
            setAddressStream(Array(60).fill(0).map({
                "GhostAuditEngine.useEffect": ()=>`DMA-REMAP [0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}] OPERATION_FLUSH STATUS_OK `
            }["GhostAuditEngine.useEffect"]).join(" "));
        }
    }["GhostAuditEngine.useEffect"], []);
    // 2. The Autonomous Muddying Daemon
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostAuditEngine.useEffect": ()=>{
            let burnInterval;
            if (autonomous) {
                // Fire persistent micro-bursts every 300ms to muddy the waters
                burnInterval = setInterval({
                    "GhostAuditEngine.useEffect": ()=>{
                        fetch('http://localhost:8000/api/burn/sink', {
                            method: 'HEAD'
                        }).catch({
                            "GhostAuditEngine.useEffect": ()=>{}
                        }["GhostAuditEngine.useEffect"]); // Swallow errors to keep the loop silent
                    }
                }["GhostAuditEngine.useEffect"], 300);
            }
            // Strict garbage collection to prevent memory leaks if the hook resets
            return ({
                "GhostAuditEngine.useEffect": ()=>clearInterval(burnInterval)
            })["GhostAuditEngine.useEffect"];
        }
    }["GhostAuditEngine.useEffect"], [
        autonomous
    ]);
    // 3. Dynamic Visual Sync for Autonomous Mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GhostAuditEngine.useEffect": ()=>{
            let visualInterval;
            if (autonomous) {
                visualInterval = setInterval({
                    "GhostAuditEngine.useEffect": ()=>{
                        setAddressStream(Array(60).fill(0).map({
                            "GhostAuditEngine.useEffect": ()=>`DMA-REMAP [0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}] OBFUSCATION_ACTIVE `
                        }["GhostAuditEngine.useEffect"]).join(" "));
                    }
                }["GhostAuditEngine.useEffect"], 300);
            }
            return ({
                "GhostAuditEngine.useEffect": ()=>clearInterval(visualInterval)
            })["GhostAuditEngine.useEffect"];
        }
    }["GhostAuditEngine.useEffect"], [
        autonomous
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-12 gap-1 h-screen p-1 bg-bg-core font-mono uppercase text-xs text-phos-base select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mb-2",
                                children: "01 // GPU_IDENTITY_TRACE"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-all font-bold tracking-tight opacity-70 border-b border-phos-muted/30 pb-2",
                                children: sig.renderer
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mt-4 mb-2",
                                children: "02 // SILICON_VENDOR"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-all font-bold tracking-tight opacity-70",
                                children: sig.vendor
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-4 border-t border-phos-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mb-2",
                                children: "03 // HARDWARE_ENVELOPE"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1 border-b border-phos-muted/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "COMPUTE_CORES:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-phos-bright",
                                        children: sig.hardware_concurrency
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 81,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "DEVICE_MEMORY:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-phos-bright",
                                        children: [
                                            "~",
                                            sig.device_memory,
                                            " GB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 84,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-8 flex flex-col items-center justify-center relative overflow-hidden bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-7xl font-bold tracking-tighter z-10 transition-colors duration-300 ${autonomous ? 'text-amber-warn drop-shadow-[0_0_8px_rgba(255,176,0,0.4)]' : 'text-phos-bright drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]'}`,
                        children: sig.entropy.toFixed(3)
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 91,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] tracking-widest mt-2 z-10 font-bold opacity-60",
                        children: autonomous ? "AUTONOMOUS_NOISE_GENERATION_ACTIVE" : "IDENTITY_ENTROPY_SNAPSHOT"
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 94,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-5 pointer-events-none text-[9px] leading-tight break-all p-2 font-mono",
                        children: addressStream
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 99,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-3 border font-bold tracking-tight transition-colors duration-300 ${autonomous ? 'border-amber-warn/30 bg-amber-warn/5 text-amber-warn' : 'border-phos-bright/30 bg-phos-bright/5 text-phos-bright'}`,
                        children: autonomous ? "ACTIVE STATUS: PERSISTENT MUDDYING PROTOCOL ENGAGED. LOCAL TELEMETRY IS CURRENTLY BEING OVERWRITTEN WITH NETWORK NOISE." : "STABLE BASAL STATE: ENTROPY BALANCED. SYSTEM SIGNATURE MEETS MINIMUM ANONYMITY ANCHORS."
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-[10px] font-bold tracking-widest mb-1 pl-1 transition-colors duration-300 ${autonomous ? 'text-amber-warn/60' : 'text-phos-bright/60'}`,
                                children: autonomous ? "CAUTION: NETWORK BANDWIDTH CONSUMPTION ACTIVE" : "CAUTION: HIGH INTENSITY HARDWARE CALLS"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAutonomous(!autonomous),
                                className: `w-full font-black py-4 transition-all tracking-widest border text-center text-sm active:scale-[0.99] ${autonomous ? "bg-bg-core text-amber-warn border-amber-warn hover:bg-amber-warn/10" : "bg-amber-warn text-bg-core border-amber-warn hover:bg-sodium"}`,
                                children: autonomous ? "DISENGAGE_AUTONOMOUS_DAEMON" : "ARM_AUTONOMOUS_DEFLECTION_LOOP"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(GhostAuditEngine, "+vABi5sgadL7PY/lcwpY0NnBxnw=");
_c = GhostAuditEngine;
var _c;
__turbopack_context__.k.register(_c, "GhostAuditEngine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Public/ghost-shield/frontend/src/app/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$components$2f$GhostAuditEngine$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx [app-client] (ecmascript)");
"use client";
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$components$2f$GhostAuditEngine$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/Public/ghost-shield/frontend/src/app/page.jsx",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Public/ghost-shield/frontend/src/app/page.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Public/ghost-shield/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Public_ghost-shield_frontend_0d8.m7y._.js.map