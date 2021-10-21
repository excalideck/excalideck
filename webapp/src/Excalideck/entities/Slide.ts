import ExcalidrawElement from "./ExcalidrawElement";

export default interface Slide {
    id: string;
    shouldRender: boolean;
    shouldRenderWithCommonElements: boolean;
    elements: ExcalidrawElement[];
}
