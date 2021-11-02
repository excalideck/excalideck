export default class SlideNotFoundAtIndex {
    constructor(
        public nonExistingIndex: number,
        public message = `No slide found at index = ${nonExistingIndex}`,
        public name = "SlideNotFoundAtIndex",
        public stack = new Error().stack
    ) {}
}
