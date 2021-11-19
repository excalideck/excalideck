import clsx from "clsx";
import { ReactNode } from "react";
import "./index.css";

interface Props {
    label: ReactNode;
    active: boolean;
    onClick: () => void;
}
export default function ViewInputRadioButton({
    label,
    active,
    onClick,
}: Props) {
    return (
        <div
            className={clsx(
                "ViewInputRadioButton",
                active
                    ? "ActiveViewInputRadioButton"
                    : "InactiveViewInputRadioButton"
            )}
            role="button"
            onClick={() => onClick()}
        >
            {label}
        </div>
    );
}
