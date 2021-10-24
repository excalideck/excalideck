export default class SlideNotFoundAtPosition {
    constructor(
        public nonExistingPosition: number,
        public message = `No slide found at position = ${nonExistingPosition}`,
        public name = "SlideNotFoundWithId",
        public stack = new Error().stack
    ) {}
}
