import Rectangle from "../../entities/Rectangle";
import RectangleInput from "../RectangleInput";
import "./index.css";

interface Props {
    printableArea: Rectangle;
    onUpdatePrintableArea: (printableArea: Rectangle) => void;
}
export default function SettingsControl({
    printableArea,
    onUpdatePrintableArea,
}: Props) {
    return (
        <div className="SettingsControl">
            <RectangleInput
                label="Printable area"
                value={printableArea}
                onChange={onUpdatePrintableArea}
            />
        </div>
    );
}
