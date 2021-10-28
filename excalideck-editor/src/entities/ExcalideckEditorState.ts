import { Deck } from "@excalideck/deck";
import View from "./View";

export default interface ExcalideckEditorState {
    readonly activeView: View;
    readonly deck: Deck;
    readonly selectedSlideId: string;
}
