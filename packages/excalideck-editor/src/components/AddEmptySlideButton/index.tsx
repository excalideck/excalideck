import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

export interface Props {
    onClick: () => void;
}
export default function AddEmptySlideButton({ onClick }: Props) {
    return (
        <button className="AddEmptySlideButton" onClick={() => onClick()}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    );
}
