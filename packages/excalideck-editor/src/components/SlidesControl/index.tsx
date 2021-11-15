import { Deck, Slide } from "@excalideck/deck";
import AddEmptySlideButton from "../AddEmptySlideButton";
import SlideMiniatures from "../SlideMiniatures";
import "./index.css";

interface Props {
    deck: Deck;
    onAddEmptySlide: () => void;
    onMoveSlide: (fromIndex: number, toIndex: number) => void;
    selectedSlide: Slide;
    onSelectSlide: (slideId: string) => void;
}
export default function SlidesControl({
    deck,
    onAddEmptySlide,
    onMoveSlide,
    selectedSlide,
    onSelectSlide,
}: Props) {
    return (
        <div className="SlidesControl" data-testid="SlidesControl">
            <SlideMiniatures
                deck={deck}
                onMoveSlide={onMoveSlide}
                selectedSlide={selectedSlide}
                onSelectSlide={onSelectSlide}
            />
            <AddEmptySlideButton onClick={onAddEmptySlide} />
        </div>
    );
}
