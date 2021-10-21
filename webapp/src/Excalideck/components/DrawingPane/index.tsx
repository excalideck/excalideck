import Deck from "../../entities/Deck";
import ExcalidrawElement from "../../entities/ExcalidrawElement";
import Slide from "../../entities/Slide";
import View from "../../entities/View";
import fingerprintRectangle from "../../utils/fingerprintRectangle";
import ExcalidrawElementsInput from "../ExcalidrawElementsInput";

interface Props {
    activeView: View;
    deck: Deck;
    onUpdateDeckCommonElements: (commonElements: ExcalidrawElement[]) => void;
    selectedSlide: Slide;
    onUpdateSelectedSlideElements: (elements: ExcalidrawElement[]) => void;
}
export default function DrawingPane({
    activeView,
    deck,
    onUpdateDeckCommonElements,
    selectedSlide,
    onUpdateSelectedSlideElements,
}: Props) {
    return (
        <ExcalidrawElementsInput
            // NOTE: forcing re-mount with a key change is a quick and dirty
            // alternative to calling the updateScene Excalidraw imperative API.
            // One of the disadvantages of this approach is losing the undo/redo
            // history of a slide's drawing board when changing slides. On the
            // other hand, just using the updateScene API would also result in a
            // broken history when changing slides.
            //
            // TODO: keep track of each slide's history, and restore it when a
            // slide is re-rendered.
            key={[
                selectedSlide.id,
                selectedSlide.shouldRenderWithCommonElements,
                activeView,
                fingerprintRectangle(deck.printableArea),
            ].join()}
            printableArea={deck.printableArea}
            latestKnownValue={
                activeView === View.Slides
                    ? selectedSlide.elements
                    : deck.commonElements
            }
            onChange={(newElements) => {
                if (activeView === View.Slides) {
                    onUpdateSelectedSlideElements(newElements);
                } else {
                    onUpdateDeckCommonElements(newElements);
                }
            }}
        />
    );
}
