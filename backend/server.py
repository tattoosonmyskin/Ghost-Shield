from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HardwareSignature(BaseModel):
    renderer: str = "UNKNOWN"
    vendor: str = "UNKNOWN"
    hardware_concurrency: int = 0
    device_memory: float = 0.0
    entropy_score: float = 0.0
    telegraphed: bool = False

# [PATCHED] Explicitly binding HEAD and GET methods for the burn sink
@app.api_route("/api/burn/sink", methods=["GET", "HEAD"])
async def burn_sink():
    # Defensive black hole endpoint to obfuscate Resource Timing data
    return {"k": uuid.uuid4().hex, "t": "ack"}

@app.post("/api/audit/narrative")
async def generate_narrative(sig: HardwareSignature):
    is_compromised = sig.telegraphed or sig.entropy_score >= 0.62
    return {
        "status": "COMPROMISED" if is_compromised else "POISONED",
        "color": "amber" if is_compromised else "green",
        "narrative": "Forensic telemetry successfully cataloged. Tracking signatures disrupted."
    }

import random

@app.get("/api/spoofer/payload")
async def get_spoof_payload():
    return {
        "cores": random.choice([2, 4, 8, 16]),
        "memory": random.choice([4, 8, 16, 32]),
        "renderer": f"Sovereign_GPU_MUX [0x{random.randint(0, 0xFFFFFF):06x}]",
        "vendor": "Ghost Engine Virtualized Interface"
    }
