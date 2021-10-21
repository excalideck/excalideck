import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

interface Props {
    title: string;
    disabled?: boolean;
    onClick: () => void;
    icon: IconProp;
}
export default function IconButton({
    title,
    disabled = false,
    onClick,
    icon,
}: Props) {
    return (
        <button
            className="IconButton"
            disabled={disabled}
            title={title}
            onClick={() => onClick()}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
