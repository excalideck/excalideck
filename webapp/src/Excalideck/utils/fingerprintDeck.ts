import Deck from "../entities/Deck";
import fingerprintExcalidrawElements from "./fingerprintExcalidrawElements";
import fingerprintRectangle from "./fingerprintRectangle";
import fingerprintSlide from "./fingerprintSlide";

export default function fingerprintDeck(deck: Deck): string {
    const start = window.performance.now();
    const fingerprint = [
        fingerprintExcalidrawElements(deck.commonElements),
        fingerprintRectangle(deck.printableArea),
        ...deck.slides.map(fingerprintSlide),
    ].join("");
    console.log(
        `fingerprinting Deck took ${window.performance.now() - start}ms`
    );
    return fingerprint;
}
