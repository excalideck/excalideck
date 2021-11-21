import { Deck } from "@excalideck/deck";

export default interface SlideRenderer<Output> {
    renderSlide(deck: Deck, slideId: string, scale: number): Output;
}
