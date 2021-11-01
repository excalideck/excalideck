import { PrintableArea } from "@excalideck/deck";
import PrintableAreaInput from "../PrintableAreaInput";
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
            <PrintableAreaInput
                label="Printable area"
                value={printableArea}
                onChange={onUpdatePrintableArea}
            />
        </div>
    );
}
