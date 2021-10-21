import Deck from "../Deck";

export default function getSelectedSlideIdAfterDeletion(
    deck: Deck,
    selectedSlideId: string
): string {
    const selectedSlideIndex = deck.slides.findIndex(
        (slide) => slide.id === selectedSlideId
    );
    const adjacentSlideIndex =
        selectedSlideIndex === 0 ? 1 : selectedSlideIndex - 1;
    return deck.slides[adjacentSlideIndex]!.id;
}
