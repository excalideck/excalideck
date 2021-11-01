import { shuffle } from "lodash";
import { Deck, Hash } from "../../src";
import {
    makeRandomExcalidrawElements,
    makeRandomPrintableArea,
    makeRandomSlides,
} from "./testUtils";

describe("Hash.deck uniquely identifies a deck's printable area, common elements (with their sort order), and slides (with their sort order)", () => {
    it("case: different printable area, different hash", () => {
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
            printableArea: makeRandomPrintableArea(),
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).not.toEqual(Hash.deck(deck1));
    });

    it("case: different common elements, different hash", () => {
        // Setup
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
            commonExcalidrawElements: makeRandomExcalidrawElements(),
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).not.toEqual(Hash.deck(deck1));
    });

    it("case: different sorting of common elements, different hash", () => {
        // Setup
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
            commonExcalidrawElements: shuffle(deck0.commonExcalidrawElements),
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).not.toEqual(Hash.deck(deck1));
    });

    it("case: different slides, different hash", () => {
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
            slides: makeRandomSlides(),
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).not.toEqual(Hash.deck(deck1));
    });

    it("case: different sorting of slides, different hash", () => {
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
            slides: shuffle(deck0.slides),
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).not.toEqual(Hash.deck(deck1));
    });

    it("case: same everything, same hash", () => {
        const deck0: Deck = {
            commonExcalidrawElements: makeRandomExcalidrawElements(),
            printableArea: makeRandomPrintableArea(),
            slides: makeRandomSlides(),
        };
        const deck1: Deck = {
            ...deck0,
        };

        // Exercise + verify
        expect(Hash.deck(deck0)).toEqual(Hash.deck(deck1));
    });
});
