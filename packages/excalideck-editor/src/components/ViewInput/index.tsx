import View from "../../entities/View";
import ViewInputRadioButton from "../ViewInputRadioButton";
import "./index.css";

interface Props {
    value: View;
    onChange: (newValue: View) => void;
}
export default function ViewInput({ value, onChange }: Props) {
    return (
        <div className="ViewInput">
            <ViewInputRadioButton
                label="Slides"
                active={value === View.Slides}
                onClick={() => onChange(View.Slides)}
            />
            <ViewInputRadioButton
                label="Settings"
                active={value === View.Settings}
                onClick={() => onChange(View.Settings)}
            />
        </div>
    );
}
