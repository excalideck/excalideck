// TODO:
// - add troubleshooting details to error / error message
// - figure out how these errors are presented to the user
export default class PrintableAreaNotValid {
    constructor(
        public message = "Printable area not valid",
        public name = "PrintableAreaNotValid",
        public stack = new Error().stack
    ) {}
}
