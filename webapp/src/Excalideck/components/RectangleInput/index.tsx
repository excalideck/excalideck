import { ReactNode } from "react";
import Rectangle from "../../entities/Rectangle";
import PointInput from "../PointInput";
import "./index.css";

interface Props {
    label: ReactNode;
    value: Rectangle;
    onChange: (newValue: Rectangle) => void;
}
export default function RectangleInput({ label, value, onChange }: Props) {
    return (
        <div className="RectangleInput">
            <label>{label}</label>
            <PointInput
                label="Top-left corner"
                value={value.topLeftCorner}
                onChange={(topLeftCorner) =>
                    onChange({ ...value, topLeftCorner })
                }
            />
            <PointInput
                label="Bottom-right corner"
                value={value.bottomRightCorner}
                onChange={(bottomRightCorner) =>
                    onChange({ ...value, bottomRightCorner })
                }
            />
        </div>
    );
}
