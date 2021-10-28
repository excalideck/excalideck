import { PrintableArea } from "@excalideck/deck";
import RectangleInput from "../RectangleInput";
import "./index.css";

interface Props {
    printableArea: PrintableArea;
    onUpdatePrintableArea: (printableArea: PrintableArea) => void;
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
