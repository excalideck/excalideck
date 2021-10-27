import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "./index.css";

interface Props {
    title: string;
    checked: boolean;
    onChange: (newChecked: boolean) => void;
    checkedIcon: IconProp;
    uncheckedIcon: IconProp;
}
export default function IconCheckbox({
    title,
    checked,
    onChange,
    checkedIcon,
    uncheckedIcon,
}: Props) {
    return (
        <button
            className={clsx(
                "IconCheckbox",
                checked ? "CheckedIconCheckbox" : "UncheckedIconCheckbox"
            )}
            title={title}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
        >
            <FontAwesomeIcon icon={checked ? checkedIcon : uncheckedIcon} />
        </button>
    );
}
