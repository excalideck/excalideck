import { Deck, ExcalidrawElement, Hash, Slide } from "@excalideck/deck";
import Library from "../../entities/Library";
import View from "../../entities/View";
import ExcalidrawElementUtils from "../../utils/ExcalidrawElementUtils";
import ExcalidrawElementsInput from "../ExcalidrawElementsInput";

interface Props {
    activeView: View;
    deck: Deck;
    onUpdateCommonExcalidrawElements: (
        commonExcalidrawElements: ExcalidrawElement[]
    ) => void;
    selectedSlide: Slide;
    onUpdateSlideExcalidrawElements: (
        slideId: string,
        excalidrawElements: ExcalidrawElement[]
    ) => void;
    initialLibrary: Library;
    onLibraryChange: (newLibrary: Library) => void;
}
export default function DrawingPane({
    activeView,
    deck,
    onUpdateCommonExcalidrawElements,
    selectedSlide,
    onUpdateSlideExcalidrawElements,
    initialLibrary,
    onLibraryChange,
}: Props) {
    return (
        <ExcalidrawElementsInput
            // Force re-mount to update `initialValue`, as required by
            // ExcalidrawElementsInput
            key={[
                selectedSlide.id,
                selectedSlide.shouldRenderWithCommonExcalidrawElements,
                activeView,
                Hash.printableArea(deck.printableArea),
            ].join()}
            printableArea={deck.printableArea}
            initialValue={
                activeView === View.Slides
                    ? ExcalidrawElementUtils.getSlideExcalidrawElementsForExcalidrawInput(
                          deck,
                          selectedSlide.id
                      )
                    : ExcalidrawElementUtils.getCommonExcalidrawElementsForExcalidrawInput(
                          deck
                      )
            }
            onChange={(newExcalidrawElements) => {
                if (activeView === View.Slides) {
                    onUpdateSlideExcalidrawElements(
                        selectedSlide.id,
                        ExcalidrawElementUtils.extractSlideExcalidrawElements(
                            newExcalidrawElements,
                            deck.commonExcalidrawElements
                        )
                    );
                } else {
                    onUpdateCommonExcalidrawElements(
                        ExcalidrawElementUtils.extractCommonExcalidrawElements(
                            newExcalidrawElements
                        )
                    );
                }
            }}
            initialLibrary={initialLibrary}
            onLibraryChange={onLibraryChange}
        />
    );
}
