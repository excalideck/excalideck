import { random, range } from "lodash";
import { ExcalidrawElement, PrintableArea, Slide } from "../../src";

export function makeRandomExcalidrawElement(): ExcalidrawElement {
    return { id: makeRandomId(), versionNonce: makeRandomNonce() };
}

export function makeRandomExcalidrawElements(length = 10): ExcalidrawElement[] {
    return range(0, length).map(makeRandomExcalidrawElement);
}

export function makeRandomSlide(): Slide {
    return {
        id: makeRandomId(),
        shouldRender: makeRandomBoolean(),
        shouldRenderWithCommonExcalidrawElements: makeRandomBoolean(),
        excalidrawElements: makeRandomExcalidrawElements(),
    };
}

export function makeRandomSlides(length = 10): Slide[] {
    return range(0, length).map(makeRandomSlide);
}

export function makeRandomPrintableArea(): PrintableArea {
    return { width: makeRandomInteger(), height: makeRandomInteger() };
}

function makeRandomId(): string {
    return String(makeRandomInteger());
}

function makeRandomNonce(): number {
    return makeRandomInteger();
}

function makeRandomInteger(): number {
    return random(1e5, 1e6, false);
}

function makeRandomBoolean(): boolean {
    return Math.random() > 0.5;
}
