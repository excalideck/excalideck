import { Deck, Slide } from "@excalideck/deck";
import { nanoid } from "nanoid";

export default function makeTestDeck(): Deck {
    const slide: Slide = {
        id: nanoid(),
        shouldRender: true,
        shouldRenderWithCommonExcalidrawElements: true,
        excalidrawElements: [
            // Top-left corner
            // Should be fully visible
            makeRectangle(0, 0, 100, 100, "green"),

            // Left side
            // Shouldn't be visible
            makeRectangle(-100, 100, 100, 100, "red"),
            // Only a 1px slice should be visible
            makeRectangle(-99, 200, 100, 100, "green"),
            // Shouldn't be visible
            makeRectangle(-100, 300, 100, 100, "red"),

            // Bottom-left corner
            // Should be fully visible
            makeRectangle(0, 400, 100, 100, "green"),

            // Bottom side
            // Shouldn't be visible
            makeRectangle(100, 500, 100, 100, "red"),
            // Only a 1px slice should be visible
            makeRectangle(200, 499, 100, 100, "green"),
            // Shouldn't be visible
            makeRectangle(300, 500, 100, 100, "red"),

            // Bottom-right corner
            // Should be fully visible
            makeRectangle(400, 400, 100, 100, "green"),

            // Right side
            // Shouldn't be visible
            makeRectangle(500, 300, 100, 100, "red"),
            // Only a 1px slice should be visible
            makeRectangle(499, 200, 100, 100, "green"),
            // Shouldn't be visible
            makeRectangle(500, 100, 100, 100, "red"),

            // Top-right corner
            // Should be fully visible
            makeRectangle(400, 0, 100, 100, "green"),

            // Top side
            // Shouldn't be visible
            makeRectangle(300, -100, 100, 100, "red"),
            // Only a 1px slice should be visible
            makeRectangle(200, -99, 100, 100, "green"),
            // Shouldn't be visible
            makeRectangle(100, -100, 100, 100, "red"),
        ],
    };
    const deck: Deck = {
        printableArea: { width: 500, height: 500 },
        commonExcalidrawElements: [],
        slides: [slide],
    };
    return deck;
}

function makeRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
) {
    return {
        id: nanoid(),
        type: "rectangle",
        x,
        y,
        width,
        height,
        angle: 0,
        strokeColor: "transparent",
        backgroundColor: color,
        fillStyle: "solid",
        strokeWidth: 0,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        groupIds: [],
        strokeSharpness: "sharp",
        seed: 0,
        version: 0,
        versionNonce: 0,
        isDeleted: false,
        boundElementIds: null,
    };
}
