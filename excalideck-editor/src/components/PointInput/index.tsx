import { Point } from "@excalideck/deck";
import { ReactNode } from "react";
import IntegerInput from "../IntegerInput";
import "./index.css";

interface Props {
    label: ReactNode;
    value: Point;
    onChange: (newValue: Point) => void;
}
export default function PointInput({ label, value, onChange }: Props) {
    return (
        <div className="PointInput">
            <label>{label}</label>
            <div className="PointInputIntegerInputs">
                <IntegerInput
                    label="X"
                    value={value.x}
                    onChange={(x) => onChange({ ...value, x })}
                />
                <IntegerInput
                    label="Y"
                    value={value.y}
                    onChange={(y) => onChange({ ...value, y })}
                />
            </div>
        </div>
    );
}
