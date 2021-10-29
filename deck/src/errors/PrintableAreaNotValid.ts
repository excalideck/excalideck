import { PrintableArea } from "..";

export default class PrintableAreaNotValid {
    constructor(
        public nonValidPrintableArea: PrintableArea,
        public message = "Width and height must be > 0",
        public name = "PrintableAreaNotValid",
        public stack = new Error().stack
    ) {}
}
