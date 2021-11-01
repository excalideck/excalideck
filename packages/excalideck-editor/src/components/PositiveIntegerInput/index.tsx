import { ReactNode } from "react";
import "./index.css";

interface Props {
    label: ReactNode;
    value: number;
    onChange: (newValue: number) => void;
}
export default function PositiveIntegerInput({
    label,
    value,
    onChange,
}: Props) {
    return (
        <div className="PositiveIntegerInput">
            <label>{label}</label>
            <input
                type="number"
                value={value}
                min={1}
                onChange={(event) => onChange(parseInt(event.target.value, 10))}
            />
        </div>
    );
}
