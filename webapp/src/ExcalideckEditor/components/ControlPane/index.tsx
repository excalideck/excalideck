import { Deck, PrintableArea, Slide } from "@excalideck/deck";
import PersistenceState from "../../entities/PersistenceState";
import View from "../../entities/View";
import ControlPaneIsland from "../ControlPaneIsland";
import PersistenceControl from "../PersistenceControl";
import SelectedSlideControl from "../SelectedSlideControl";
import SettingsControl from "../SettingsControl";
import SlidesControl from "../SlidesControl";
import ViewInput from "../ViewInput";
import "./index.css";

interface Props {
    activeView: View;
    onActivateView: (view: View) => void;
    deck: Deck;
    onAddEmptySlide: () => void;
    onMoveSlide: (fromIndex: number, toIndex: number) => void;
    onUpdatePrintableArea: (printableArea: PrintableArea) => void;
    selectedSlide: Slide;
    onDeleteSelectedSlide: () => void;
    onSelectSlide: (slideId: string) => void;
    onUpdateSelectedSlideShouldRender: (shouldRender: boolean) => void;
    onUpdateSelectedSlideShouldRenderWithCommonExcalidrawElements: (
        shouldRenderWithCommonExcalidrawElements: boolean
    ) => void;
    persistenceState: PersistenceState;
    onOpen: () => void;
    onSave: () => void;
}
export default function ControlPane({
    activeView,
    onActivateView,
    deck,
    onAddEmptySlide,
    onMoveSlide,
    onUpdatePrintableArea,
    selectedSlide,
    onDeleteSelectedSlide,
    onSelectSlide,
    onUpdateSelectedSlideShouldRender,
    onUpdateSelectedSlideShouldRenderWithCommonExcalidrawElements,
    persistenceState,
    onOpen,
    onSave,
}: Props) {
    return (
        <div className="ControlPane">
            <ControlPaneIsland>
                <PersistenceControl
                    persistenceState={persistenceState}
                    onOpen={onOpen}
                    onSave={onSave}
                />
            </ControlPaneIsland>
            <ControlPaneIsland>
                <ViewInput value={activeView} onChange={onActivateView} />
                {activeView === View.Slides ? (
                    <SlidesControl
                        slides={deck.slides}
                        onAddEmptySlide={onAddEmptySlide}
                        onMoveSlide={onMoveSlide}
                        selectedSlide={selectedSlide}
                        onSelectSlide={onSelectSlide}
                    />
                ) : null}
                {activeView === View.Settings ? (
                    <SettingsControl
                        printableArea={deck.printableArea}
                        onUpdatePrintableArea={onUpdatePrintableArea}
                    />
                ) : null}
            </ControlPaneIsland>
            {activeView === View.Slides ? (
                <ControlPaneIsland>
                    <SelectedSlideControl
                        slide={selectedSlide}
                        onDelete={onDeleteSelectedSlide}
                        onUpdateShouldRender={onUpdateSelectedSlideShouldRender}
                        onUpdateShouldRenderWithCommonExcalidrawElements={
                            onUpdateSelectedSlideShouldRenderWithCommonExcalidrawElements
                        }
                    />
                </ControlPaneIsland>
            ) : null}
        </div>
    );
}
