import ExcalidrawElement from "../entities/ExcalidrawElement";

export default function fingerprintExcalidrawElements(
    elements: ExcalidrawElement[]
): string {
    // Use for...of instead of Array.reduce because Array.reduce takes 40% more
    // time to execute
    let fingerprint = 0;
    for (const { versionNonce } of elements) {
        fingerprint = fingerprint + versionNonce;
    }
    return fingerprint.toString();
}
