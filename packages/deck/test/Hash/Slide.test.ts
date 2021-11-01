import { shuffle } from "lodash";
import { Hash, Slide } from "../../src";
import { makeRandomExcalidrawElements } from "./testUtils";

describe("Hash.slide uniquely identifies a slide configuration and its excalidraw elements (with their sort order)", () => {
    it("case: different shouldRender, different hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: true,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
            shouldRender: false,
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).not.toEqual(Hash.slide(slide1));
    });

    it("case: different shouldRenderWithCommonExcalidrawElements, different hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: true,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
            shouldRenderWithCommonExcalidrawElements: false,
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).not.toEqual(Hash.slide(slide1));
    });

    it("case: inverted shouldRender and shouldRenderWithCommonExcalidrawElements, different hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: false,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
            shouldRender: false,
            shouldRenderWithCommonExcalidrawElements: true,
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).not.toEqual(Hash.slide(slide1));
    });

    it("case: different excalidraw elements, different hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: false,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
            excalidrawElements: makeRandomExcalidrawElements(),
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).not.toEqual(Hash.slide(slide1));
    });

    it("case: different sorting of excalidraw elements, different hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: false,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
            excalidrawElements: shuffle(slide0.excalidrawElements),
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).not.toEqual(Hash.slide(slide1));
    });

    it("case: same everything, same hash", () => {
        // Setup
        const slide0: Slide = {
            id: "slide0",
            shouldRender: true,
            shouldRenderWithCommonExcalidrawElements: false,
            excalidrawElements: makeRandomExcalidrawElements(),
        };
        const slide1: Slide = {
            ...slide0,
            id: "slide1",
        };

        // Exercise + verify
        expect(Hash.slide(slide0)).toEqual(Hash.slide(slide1));
    });
});
