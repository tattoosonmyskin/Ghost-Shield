module.exports = [
"[project]/Public/ghost-shield/frontend/src/lib/fingerprint.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Public/ghost-shield/frontend/src/lib/burn.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GhostAuditEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/lib/fingerprint.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$burn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/lib/burn.js [app-ssr] (ecmascript)");
;
;
;
;
function GhostAuditEngine() {
    const [sig, setSig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        renderer: 'INITIALIZING FILE SYSTEMS...',
        cores: 0,
        memory: 0,
        entropy: 0.0
    });
    const [burning, setBurning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addressStream, setAddressStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        const entropy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeEntropy"])(signature);
        setSig({
            ...signature,
            entropy
        });
        // Client-side execution only to bypass SSR Hydration collision
        setAddressStream(Array(60).fill(0).map(()=>`DMA-REMAP [0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}] OPERATION_FLUSH STATUS_OK `).join(" "));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-12 gap-1 h-screen p-1 bg-bg-core font-mono uppercase text-xs text-phos-base select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mb-2",
                                children: "01 // GPU_IDENTITY_TRACE"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-all font-bold tracking-tight opacity-70 border-b border-phos-muted/30 pb-2",
                                children: sig.renderer
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mt-4 mb-2",
                                children: "02 // SILICON_VENDOR"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-all font-bold tracking-tight opacity-70",
                                children: sig.vendor
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-4 border-t border-phos-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mb-2",
                                children: "03 // HARDWARE_ENVELOPE"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1 border-b border-phos-muted/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "COMPUTE_CORES:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-phos-bright",
                                        children: sig.hardware_concurrency
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 54,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "DEVICE_MEMORY:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-phos-bright",
                                        children: [
                                            "~",
                                            sig.device_memory,
                                            " GB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 57,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-8 flex flex-col items-center justify-center relative overflow-hidden bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-7xl font-bold tracking-tighter text-phos-bright drop-shadow-[0_0_8px_rgba(0,255,65,0.4)] z-10",
                        children: sig.entropy.toFixed(3)
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 64,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] tracking-widest text-phos-bright/60 mt-2 z-10 font-bold",
                        children: "IDENTITY_ENTROPY_SNAPSHOT"
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 67,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-5 pointer-events-none text-[9px] leading-tight break-all p-2 font-mono",
                        children: addressStream
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 70,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border border-amber-warn/30 bg-amber-warn/5 text-amber-warn tracking-tight font-bold",
                        children: sig.entropy >= 0.62 ? "CRITICAL STATUS: TELEGRAPHED SIGNATURE DETECTED. IDENTITY IS SUSCEPTIBLE TO PASSIVE TRACKING MOVEMENT." : "STABLE BASAL STATE: ENTROPY BALANCED. SYSTEM SIGNATURE MEETS MINIMUM ANONYMITY ANCHORS."
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-amber-warn/60 font-bold tracking-widest mb-1 pl-1",
                                children: "CAUTION: HIGH INTENSITY HARDWARE CALLS"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: async ()=>{
                                    setBurning(true);
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$burn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runBurnSequence"])('http://localhost:8000/api');
                                    setBurning(false);
                                },
                                className: "w-full bg-amber-warn text-bg-core font-black py-4 hover:bg-sodium transition-all tracking-widest border border-amber-warn text-center text-sm active:scale-[0.99]",
                                disabled: burning,
                                children: burning ? "POISONING_ACTIVE_BLINDING_TRACKERS..." : "EXECUTE_DESTRUCT_DEFLECTION_LOOP"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
}),
"[project]/Public/ghost-shield/frontend/src/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$components$2f$GhostAuditEngine$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$components$2f$GhostAuditEngine$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
}),
"[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Public_ghost-shield_frontend_101.7qr._.js.map