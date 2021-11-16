import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import omitNilCssRules from "../../utils/omitNilCssRules";
import SlideMiniature, {
    Props as SlideMiniatureProps,
} from "../SlideMiniature";
import "./index.css";

const SORTABLE_SLIDE_MINIATURE_MOVE_TRANSITION_DURATION = parseInt(
    process.env["SORTABLE_SLIDE_MINIATURE_MOVE_TRANSITION_DURATION"] ?? "250",
    10
);

interface Props extends SlideMiniatureProps {
    id: string;
}
export default function SortableSlideMiniature({
    id,
    ...slideMiniatureProps
}: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        transition: {
            duration: SORTABLE_SLIDE_MINIATURE_MOVE_TRANSITION_DURATION,
            easing: "ease",
        },
    });
    return (
        <div
            className="SortableSlideMiniature"
            data-testid={`SortableSlideMiniature-${id}`}
            ref={setNodeRef}
            style={omitNilCssRules({
                transform: CSS.Transform.toString(transform),
                transition,
                visibility: isDragging ? "hidden" : "visible",
            })}
            {...attributes}
            {...listeners}
        >
            <SlideMiniature {...slideMiniatureProps} />
        </div>
    );
}
