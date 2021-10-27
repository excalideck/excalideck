import { Slide } from "@excalideck/deck";
import AddEmptySlideButton from "../AddEmptySlideButton";
import SlideMiniatures from "../SlideMiniatures";
import "./index.css";

interface Props {
    slides: Slide[];
    onAddEmptySlide: () => void;
    onMoveSlide: (fromIndex: number, toIndex: number) => void;
    selectedSlide: Slide;
    onSelectSlide: (slideId: string) => void;
}
export default function SlidesControl({
    slides,
    onAddEmptySlide,
    onMoveSlide,
    selectedSlide,
    onSelectSlide,
}: Props) {
    return (
        <div className="SlidesControl">
            <SlideMiniatures
                slides={slides}
                onMoveSlide={onMoveSlide}
                selectedSlide={selectedSlide}
                onSelectSlide={onSelectSlide}
            />
            <AddEmptySlideButton onClick={onAddEmptySlide} />
        </div>
    );
}
