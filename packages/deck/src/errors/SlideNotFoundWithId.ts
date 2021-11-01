export default class SlideNotFoundWithId {
    constructor(
        public nonExistingId: string,
        public message = `No slide found with id = ${nonExistingId}`,
        public name = "SlideNotFoundWithId",
        public stack = new Error().stack
    ) {}
}
