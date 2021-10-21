import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
    faEye,
    faEyeSlash,
    faShapes,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Slide from "../../entities/Slide";
import IconButton from "../IconButton";
import IconCheckbox from "../IconCheckbox";
import "./index.css";

interface Props {
    slide: Slide;
    onDelete: () => void;
    onUpdateShouldRender: (shouldRender: boolean) => void;
    onUpdateShouldRenderWithCommonElements: (
        shouldRenderWithCommonElements: boolean
    ) => void;
}
export default function SelectedSlideControl({
    slide,
    onDelete,
    onUpdateShouldRender,
    onUpdateShouldRenderWithCommonElements,
}: Props) {
    return (
        <div className="SelectedSlideControl">
            <div>
                <IconCheckbox
                    title="Skip"
                    checked={slide.shouldRender}
                    onChange={onUpdateShouldRender}
                    checkedIcon={faEye}
                    uncheckedIcon={faEyeSlash}
                />
                <IconCheckbox
                    title="Include common elements"
                    checked={slide.shouldRenderWithCommonElements}
                    onChange={onUpdateShouldRenderWithCommonElements}
                    checkedIcon={faShapes}
                    uncheckedIcon={faCircle}
                />
            </div>
            <div>
                <IconButton
                    title="Delete slide"
                    icon={faTrashAlt}
                    onClick={() =>
                        window.confirm("Delete the selected slide?") &&
                        onDelete()
                    }
                />
            </div>
        </div>
    );
}
