import { ReactNode } from "react";
import "./index.css";

interface Props {
    label: ReactNode;
    value: number;
    onChange: (newValue: number) => void;
}
export default function IntegerInput({ label, value, onChange }: Props) {
    return (
        <div className="IntegerInput">
            <label>{label}</label>
            <input
                type="number"
                value={value}
                onChange={(event) => onChange(parseInt(event.target.value, 10))}
            />
        </div>
    );
}
