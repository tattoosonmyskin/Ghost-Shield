import React, { useState, useEffect } from 'react';
import { computeEntropy } from '../lib/fingerprint';
import { runBurnSequence } from '../lib/burn';

export default function GhostAuditEngine() {
  const [sig, setSig] = useState({ renderer: 'INITIALIZING FILE SYSTEMS...', cores: 0, memory: 0, entropy: 0.0 });
  const [autonomous, setAutonomous] = useState(false);
  const [addressStream, setAddressStream] = useState('');

  // 1. Hardware Fingerprint Initialization
  useEffect(() => {
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
      device_memory: navigator.deviceMemory || 4.0,
    };
    
    const entropy = computeEntropy(signature);
    setSig({ ...signature, entropy });

    setAddressStream(
      Array(60).fill(0).map(() => `DMA-REMAP [0x${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}] OPERATION_FLUSH STATUS_OK `).join(" ")
    );
  }, []);

  // 2. The Autonomous Muddying Daemon
  useEffect(() => {
    let burnInterval;
    if (autonomous) {
      // Fire persistent micro-bursts every 300ms to muddy the waters
      burnInterval = setInterval(() => {
        fetch('http://localhost:8000/api/burn/sink', { method: 'HEAD' })
          .catch(() => {}); // Swallow errors to keep the loop silent
      }, 300); 
    }
    // Strict garbage collection to prevent memory leaks if the hook resets
    return () => clearInterval(burnInterval);
  }, [autonomous]);

  // 3. Dynamic Visual Sync for Autonomous Mode
  useEffect(() => {
    let visualInterval;
    if (autonomous) {
        visualInterval = setInterval(() => {
            setAddressStream(
                Array(60).fill(0).map(() => `DMA-REMAP [0x${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}] OBFUSCATION_ACTIVE `).join(" ")
              );
        }, 300);
    }
    return () => clearInterval(visualInterval);
  }, [autonomous]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 h-screen p-1 bg-bg-core font-mono uppercase text-xs text-phos-base select-none">
      
      {/* Visual Data Column */}
      <div className="md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core">
        <div>
          <div className="text-phos-bright tracking-widest font-bold mb-2">01 // GPU_IDENTITY_TRACE</div>
          <div className="break-all font-bold tracking-tight opacity-70 border-b border-phos-muted/30 pb-2">{sig.renderer}</div>
          <div className="text-phos-bright tracking-widest font-bold mt-4 mb-2">02 // SILICON_VENDOR</div>
          <div className="break-all font-bold tracking-tight opacity-70">{sig.vendor}</div>
        </div>
        <div className="mt-4 pt-4 border-t border-phos-muted/30">
          <div className="text-phos-bright tracking-widest font-bold mb-2">03 // HARDWARE_ENVELOPE</div>
          <div className="flex justify-between py-1 border-b border-phos-muted/10">
            <span>COMPUTE_CORES:</span><span className="font-bold text-phos-bright">{sig.hardware_concurrency}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>DEVICE_MEMORY:</span><span className="font-bold text-phos-bright">~{sig.device_memory} GB</span>
          </div>
        </div>
      </div>

      {/* Central Threat Metric Display */}
      <div className="md:col-span-4 border border-phos-muted p-8 flex flex-col items-center justify-center relative overflow-hidden bg-bg-core">
         <div className={`text-7xl font-bold tracking-tighter z-10 transition-colors duration-300 ${autonomous ? 'text-amber-warn drop-shadow-[0_0_8px_rgba(255,176,0,0.4)]' : 'text-phos-bright drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]'}`}>
           {sig.entropy.toFixed(3)}
         </div>
         <div className="text-[10px] tracking-widest mt-2 z-10 font-bold opacity-60">
             {autonomous ? "AUTONOMOUS_NOISE_GENERATION_ACTIVE" : "IDENTITY_ENTROPY_SNAPSHOT"}
         </div>
         
         {/* Live Dynamic Address Stream Simulation Overlay */}
         <div className="absolute inset-0 opacity-5 pointer-events-none text-[9px] leading-tight break-all p-2 font-mono">
            {addressStream}
         </div>
      </div>

      {/* Action Interface Terminal */}
      <div className="md:col-span-4 border border-phos-muted p-4 flex flex-col justify-between bg-bg-core">
        <div className={`p-3 border font-bold tracking-tight transition-colors duration-300 ${autonomous ? 'border-amber-warn/30 bg-amber-warn/5 text-amber-warn' : 'border-phos-bright/30 bg-phos-bright/5 text-phos-bright'}`}>
          {autonomous 
            ? "ACTIVE STATUS: PERSISTENT MUDDYING PROTOCOL ENGAGED. LOCAL TELEMETRY IS CURRENTLY BEING OVERWRITTEN WITH NETWORK NOISE."
            : "STABLE BASAL STATE: ENTROPY BALANCED. SYSTEM SIGNATURE MEETS MINIMUM ANONYMITY ANCHORS."}
        </div>
        <div className="mt-auto">
          <div className={`text-[10px] font-bold tracking-widest mb-1 pl-1 transition-colors duration-300 ${autonomous ? 'text-amber-warn/60' : 'text-phos-bright/60'}`}>
              {autonomous ? "CAUTION: NETWORK BANDWIDTH CONSUMPTION ACTIVE" : "CAUTION: HIGH INTENSITY HARDWARE CALLS"}
          </div>
          <button 
            onClick={() => setAutonomous(!autonomous)}
            className={`w-full font-black py-4 transition-all tracking-widest border text-center text-sm active:scale-[0.99] ${
                autonomous 
                ? "bg-bg-core text-amber-warn border-amber-warn hover:bg-amber-warn/10" 
                : "bg-amber-warn text-bg-core border-amber-warn hover:bg-sodium"
            }`}
          >
            {autonomous ? "DISENGAGE_AUTONOMOUS_DAEMON" : "ARM_AUTONOMOUS_DEFLECTION_LOOP"}
          </button>
        </div>
      </div>
    </div>
  );
}
