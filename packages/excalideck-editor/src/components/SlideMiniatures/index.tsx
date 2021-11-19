import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Deck, DeckOperations, Slide } from "@excalideck/deck";
import { useState } from "react";
import SlideMiniature from "../SlideMiniature";
import SortableSlideMiniature from "../SortableSlideMiniature";

const SLIDE_MINIATURES_DROP_TRANSITION_DURATION = parseInt(
    process.env["SLIDE_MINIATURES_DROP_TRANSITION_DURATION"] ?? "250",
    10
);

interface Props {
    deck: Deck;
    onMoveSlide: (fromIndex: number, toIndex: number) => void;
    selectedSlide: Slide;
    onSelectSlide: (slideId: string) => void;
}
export default function SlidesMiniatures({
    deck,
    onMoveSlide,
    selectedSlide,
    onSelectSlide,
}: Props) {
    const { slides } = deck;
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
                // active and over are, respectively, the SortableSlideMiniature
                // element being dragged and the SortableSlideMiniature element
                // being scooted over. Their ids correspond to the ids of their
                // slides.
                if (over && active.id !== over.id) {
                    onMoveSlide(
                        DeckOperations.getSlideIndex(deck, active.id),
                        DeckOperations.getSlideIndex(deck, over.id)
                    );
                }
                setActiveId(null);
            }}
            onDragStart={({ active }) => {
                // active is the SortableSlideMiniature element being dragged.
                // Its id corresponds to the id of its slide.
                onSelectSlide(active.id);
                setActiveId(active.id);
            }}
        >
            <SortableContext
                items={slides}
                strategy={verticalListSortingStrategy}
            >
                {slides.map((slide, index) => (
                    <SortableSlideMiniature
                        id={slide.id}
                        key={slide.id}
                        deck={deck}
                        slide={slide}
                        slideIndex={index}
                        isSlideSelected={slide.id === selectedSlide.id}
                    />
                ))}
            </SortableContext>
            <DragOverlay
                dropAnimation={{
                    duration: SLIDE_MINIATURES_DROP_TRANSITION_DURATION,
                    easing: "ease",
                }}
            >
                {activeId ? (
                    <SlideMiniature
                        deck={deck}
                        slide={DeckOperations.getSlide(deck, activeId)}
                        slideIndex={DeckOperations.getSlideIndex(
                            deck,
                            activeId
                        )}
                        isSlideSelected={activeId === selectedSlide.id}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
