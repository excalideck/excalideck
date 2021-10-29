import { Hash, PrintableArea } from "../../src";
import { makeRandomPrintableArea } from "./testUtils";

describe("Hash.printableArea uniquely identifies a printable area", () => {
    it("case: different printable areas, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = makeRandomPrintableArea();

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: different width, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = {
            ...printableArea0,
            width: makeRandomPrintableArea().width,
        };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: different height, different hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = {
            ...printableArea0,
            height: makeRandomPrintableArea().height,
        };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).not.toEqual(
            Hash.printableArea(printableArea1)
        );
    });

    it("case: same width and height, same hashes", () => {
        // Setup
        const printableArea0: PrintableArea = makeRandomPrintableArea();
        const printableArea1: PrintableArea = { ...printableArea0 };

        // Exercise + verify
        expect(Hash.printableArea(printableArea0)).toEqual(
            Hash.printableArea(printableArea1)
        );
    });
});
