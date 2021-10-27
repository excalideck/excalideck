import {
    closestCenter,
    DndContext,
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
import { Slide } from "@excalideck/deck";
import SortableSlideMiniature from "../SortableSlideMiniature";

interface Props {
    slides: Slide[];
    onMoveSlide: (fromIndex: number, toIndex: number) => void;
    selectedSlide: Slide;
    onSelectSlide: (slideId: string) => void;
}
export default function SlidesMiniatures({
    slides,
    onMoveSlide,
    selectedSlide,
    onSelectSlide,
}: Props) {
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
                        slides.findIndex((slide) => slide.id === active.id),
                        slides.findIndex((slide) => slide.id === over.id)
                    );
                }
            }}
            onDragStart={({ active }) => {
                // active is the SortableSlideMiniature element being dragged.
                // Its id corresponds to the id of its slide.
                onSelectSlide(active.id);
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
                        slide={slide}
                        slidePosition={index}
                        isSlideSelected={slide.id === selectedSlide.id}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}
