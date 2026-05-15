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
"[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GhostAuditEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$src$2f$lib$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Public/ghost-shield/frontend/src/lib/fingerprint.js [app-ssr] (ecmascript)");
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
    const [autonomous, setAutonomous] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addressStream, setAddressStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // 1. Hardware Fingerprint Initialization
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
        setAddressStream(Array(60).fill(0).map(()=>`DMA-REMAP [0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}] OPERATION_FLUSH STATUS_OK `).join(" "));
    }, []);
    // 2. The Autonomous Muddying Daemon
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let burnInterval;
        if (autonomous) {
            // Fire persistent micro-bursts every 300ms to muddy the waters
            burnInterval = setInterval(()=>{
                fetch('http://localhost:8000/api/burn/sink', {
                    method: 'HEAD'
                }).catch(()=>{}); // Swallow errors to keep the loop silent
            }, 300);
        }
        // Strict garbage collection to prevent memory leaks if the hook resets
        return ()=>clearInterval(burnInterval);
    }, [
        autonomous
    ]);
    // 3. Dynamic Visual Sync for Autonomous Mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let visualInterval;
        if (autonomous) {
            visualInterval = setInterval(()=>{
                setAddressStream(Array(60).fill(0).map(()=>`DMA-REMAP [0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}] OBFUSCATION_ACTIVE `).join(" "));
            }, 300);
        }
        return ()=>clearInterval(visualInterval);
    }, [
        autonomous
    ]);
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
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "break-all font-bold tracking-tight opacity-70 border-b border-phos-muted/30 pb-2",
                                children: sig.renderer
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mt-4 mb-2",
                                children: "02 // SILICON_VENDOR"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-4 border-t border-phos-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-phos-bright tracking-widest font-bold mb-2",
                                children: "03 // HARDWARE_ENVELOPE"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1 border-b border-phos-muted/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "COMPUTE_CORES:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "DEVICE_MEMORY:"
                                    }, void 0, false, {
                                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                        lineNumber: 84,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-8 flex flex-col items-center justify-center relative overflow-hidden bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-7xl font-bold tracking-tighter z-10 transition-colors duration-300 ${autonomous ? 'text-amber-warn drop-shadow-[0_0_8px_rgba(255,176,0,0.4)]' : 'text-phos-bright drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]'}`,
                        children: sig.entropy.toFixed(3)
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 91,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] tracking-widest mt-2 z-10 font-bold opacity-60",
                        children: autonomous ? "AUTONOMOUS_NOISE_GENERATION_ACTIVE" : "IDENTITY_ENTROPY_SNAPSHOT"
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 94,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-3 border font-bold tracking-tight transition-colors duration-300 ${autonomous ? 'border-amber-warn/30 bg-amber-warn/5 text-amber-warn' : 'border-phos-bright/30 bg-phos-bright/5 text-phos-bright'}`,
                        children: autonomous ? "ACTIVE STATUS: PERSISTENT MUDDYING PROTOCOL ENGAGED. LOCAL TELEMETRY IS CURRENTLY BEING OVERWRITTEN WITH NETWORK NOISE." : "STABLE BASAL STATE: ENTROPY BALANCED. SYSTEM SIGNATURE MEETS MINIMUM ANONYMITY ANCHORS."
                    }, void 0, false, {
                        fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-[10px] font-bold tracking-widest mb-1 pl-1 transition-colors duration-300 ${autonomous ? 'text-amber-warn/60' : 'text-phos-bright/60'}`,
                                children: autonomous ? "CAUTION: NETWORK BANDWIDTH CONSUMPTION ACTIVE" : "CAUTION: HIGH INTENSITY HARDWARE CALLS"
                            }, void 0, false, {
                                fileName: "[project]/Public/ghost-shield/frontend/src/components/GhostAuditEngine.jsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Public$2f$ghost$2d$shield$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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

//# sourceMappingURL=Public_ghost-shield_frontend_0c.d3zg._.js.map