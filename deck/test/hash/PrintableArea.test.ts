import { Hash, PrintableArea } from "../../src";
import { makeRandomPoint, makeRandomPrintableArea } from "./testUtils";

describe("Hash.printableArea uniquely identifies a printable area", () => {
    it("case: all different corners, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = makeRandomPrintableArea();

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: different topLeftCorner, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = {
            ...printableArea0,
            topLeftCorner: makeRandomPoint(),
        };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: different bottomRightCorner, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = {
            ...printableArea0,
            bottomRightCorner: makeRandomPoint(),
        };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: inverted corners, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = {
            topLeftCorner: printableArea0.bottomRightCorner,
            bottomRightCorner: printableArea0.topLeftCorner,
        };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: same corners, same hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = { ...printableArea0 };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).toEqual(
            Hash.printableArea(printableArea1)
        );
    });
});
