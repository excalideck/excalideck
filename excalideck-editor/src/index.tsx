import { Deck } from "@excalideck/deck";
import ControlPane from "./components/ControlPane";
import DrawingPane from "./components/DrawingPane";
import PersistenceState from "./entities/PersistenceState";
import useExcalideckEditorState from "./hooks/useExcalideckEditorState";
import "./index.css";

export type { default as PersistenceState } from "./entities/PersistenceState";
export { default as PersistenceStateStatus } from "./entities/PersistenceStateStatus";

interface Props {
    initialDeck: Deck;
    onDeckChange: (newDeck: Deck) => void;
    persistenceState: PersistenceState;
    onOpen: () => void;
    onSave: () => void;
}
export default function ExcalideckEditor({
    initialDeck,
    onDeckChange,
    persistenceState,
    onOpen,
    onSave,
}: Props) {
    const {
        activeView,
        activateView,
        deck,
        addEmptySlide,
        moveSlide,
        updateCommonExcalidrawElements,
        updatePrintableArea,
        selectedSlide,
        deleteSlide,
        selectSlide,
        updateSlideExcalidrawElements,
        updateSlideShouldRender,
        updateSlideShouldRenderWithCommonExcalidrawElements,
    } = useExcalideckEditorState(initialDeck, onDeckChange);
    return (
        <div className="ExcalideckEditor">
            <DrawingPane
                activeView={activeView}
                deck={deck}
                onUpdateCommonExcalidrawElements={
                    updateCommonExcalidrawElements
                }
                selectedSlide={selectedSlide}
                onUpdateSlideExcalidrawElements={updateSlideExcalidrawElements}
            />
            <ControlPane
                activeView={activeView}
                onActivateView={activateView}
                deck={deck}
                onAddEmptySlide={addEmptySlide}
                onMoveSlide={moveSlide}
                onUpdatePrintableArea={updatePrintableArea}
                selectedSlide={selectedSlide}
                onDeleteSlide={deleteSlide}
                onSelectSlide={selectSlide}
                onUpdateSlideShouldRender={updateSlideShouldRender}
                onUpdateSlideShouldRenderWithCommonExcalidrawElements={
                    updateSlideShouldRenderWithCommonExcalidrawElements
                }
                persistenceState={persistenceState}
                onOpen={onOpen}
                onSave={onSave}
            />
        </div>
    );
}
