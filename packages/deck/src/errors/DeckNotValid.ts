// TODO:
// - add troubleshooting details to error / error message
// - figure out how these errors are presented to the user
export default class DeckNotValid {
    constructor(
        public message = "Deck not valid",
        public name = "DeckNotValid",
        public stack = new Error().stack
    ) {}
}
