import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SlideMiniature, {
    Props as SlideMiniatureProps,
} from "../SlideMiniature";
import "./index.css";

interface Props extends SlideMiniatureProps {
    id: string;
}
export default function SortableSlideMiniature({
    id,
    ...slideMiniatureProps
}: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });
    return (
        <div
            className="SortableSlideMiniature"
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}
            {...listeners}
        >
            <SlideMiniature {...slideMiniatureProps} />
        </div>
    );
}
