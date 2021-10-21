import { ReactNode } from "react";
import "./index.css";

interface Props {
    children: ReactNode;
}
export default function ControlPaneIsland({ children }: Props) {
    return <div className="ControlPaneIsland">{children}</div>;
}
