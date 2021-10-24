import ExcalidrawElement from "../entities/ExcalidrawElement";

const ExcalidrawElementUtils = {
    getIds(excalidrawElements: ExcalidrawElement[]): string[] {
        return excalidrawElements.map(
            (excalidrawElement) => excalidrawElement.id
        );
    },

    removeByIds(
        excalidrawElements: ExcalidrawElement[],
        ids: string[]
    ): ExcalidrawElement[] {
        const idSet = new Set(ids);
        return excalidrawElements.filter(
            (excalidrawElement) => !idSet.has(excalidrawElement.id)
        );
    },
};
export default ExcalidrawElementUtils;
