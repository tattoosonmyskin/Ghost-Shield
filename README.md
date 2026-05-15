# Bifurcated Telemetry Obfuscator

## Operational Definition

This repository contains an active defense tool, not a passive blocker. The system does not suppress telemetry channels or attempt absence. It emits continuous stochastic noise into the observable hardware surface. The inversion is deliberate: it does not hide; it screams.

## Inversion Model

The defensive premise is that static concealment leaves a negative signature. The implemented model instead saturates fingerprint collection with variable hardware claims, unstable renderer output, and synthetic timing pressure. The collector receives a signal, but the signal is made non-stationary.

Basal entropy is treated as an operational threshold. A trackability float at or above `0.62` is classified as exposed enough to require poisoning rather than observation.

## Architecture

The system is bifurcated.

The local sink is a FastAPI daemon bound to `127.0.0.1:8000`. It exposes telemetry burn and audit endpoints while remaining local to the host. The burn sink is intended for repeated local acknowledgement and stochastic key production. TCP port exhaustion is handled by a `300ms` loop in the local deployment path, allowing repeated connection pressure without requiring a remote endpoint.

The MV3 WebExtension runs at `document_start`. It injects a page-context script and performs zero-latency synchronous DOM prototype poisoning. The hooks target `navigator.hardwareConcurrency`, `navigator.deviceMemory`, and `WebGLRenderingContext.prototype.getParameter`. The synchronous mutation is used to bypass V8 engine race conditions in which fingerprint collectors execute before asynchronous content-script work can complete.

## Prototype Hooks

The WebGL hook mutates renderer and vendor returns for debug renderer queries. Hardware concurrency is exposed as a randomized value. Device memory is stabilized at a declared value while the renderer string varies.

Injected variance example:

```text
DMA-REMAP [0x00000000bd6a1000]
```

## Deployment

Run the installer from the repository root:

```bash
chmod +x install.sh
./install.sh
```

The installer creates `.venv`, installs `fastapi` and `uvicorn`, prints the MV3 loading instructions, and launches the local daemon on `127.0.0.1:8000`.

Manual MV3 extension loading:

```text
Open chrome://extensions/
Enable Developer mode.
Select Load unpacked.
Select the repository extension directory.
```

## Constraint Surface

This tool changes the emitted telemetry surface. It is not a request filter, domain denylist, content blocker, proxy, or passive privacy layer. Its operational value depends on active variance against JavaScript prototype inspection and local sink traffic behavior.

# Ghost-Shield
