export default class ExcalideckFileNotValid {
    constructor(
        public message = "Excalideck file not valid",
        public name = "ExcalideckFileNotValid",
        public stack = new Error().stack
    ) {}
}
