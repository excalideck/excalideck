import ExcalidrawElement from "./ExcalidrawElement";

export default interface Slide {
    readonly id: string;
    readonly shouldRender: boolean;
    readonly shouldRenderWithCommonExcalidrawElements: boolean;
    readonly excalidrawElements: ExcalidrawElement[];
}
