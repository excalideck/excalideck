import { PrintableArea } from "@excalideck/deck";
import { ReactNode } from "react";
import PositiveIntegerInput from "../PositiveIntegerInput";
import "./index.css";

interface Props {
    label: ReactNode;
    value: PrintableArea;
    onChange: (newValue: PrintableArea) => void;
}
export default function PrintableAreaInput({ label, value, onChange }: Props) {
    return (
        <div className="PrintableAreaInput">
            <label>{label}</label>
            <div className="PrintableAreaInputPositiveIntegerInputs">
                <PositiveIntegerInput
                    label="Width"
                    value={value.width}
                    onChange={(newWidth) =>
                        onChange({ ...value, width: newWidth })
                    }
                />
                <PositiveIntegerInput
                    label="Height"
                    value={value.height}
                    onChange={(newHeight) =>
                        onChange({ ...value, height: newHeight })
                    }
                />
            </div>
        </div>
    );
}
