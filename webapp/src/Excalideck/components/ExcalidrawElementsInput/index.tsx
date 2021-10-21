import Excalidraw from "@excalidraw/excalidraw";
import { Zoom } from "@excalidraw/excalidraw/types/types";
import { cloneDeep, debounce } from "lodash";
import { useCallback } from "react";
import ExcalidrawElement from "../../entities/ExcalidrawElement";
import Rectangle from "../../entities/Rectangle";
import fingerprintExcalidrawElements from "../../utils/fingerprintExcalidrawElements";
import "./index.css";

interface Props {
    printableArea: Rectangle;
    latestKnownValue: ExcalidrawElement[];
    onChange: (newValue: ExcalidrawElement[]) => void;
}
export default function ExcalidrawElementsInput({
    printableArea,
    latestKnownValue,
    onChange,
}: Props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeCallback = useCallback(
        debounce((newElements: ExcalidrawElement[]) => {
            if (
                fingerprintExcalidrawElements(newElements) !==
                fingerprintExcalidrawElements(latestKnownValue)
            ) {
                onChange(cloneDeep(newElements));
            }
        }, 100),
        [latestKnownValue]
    );
    return (
        <div className="ExcalidrawElementsInput">
            <Excalidraw
                initialData={{
                    elements: latestKnownValue as any,
                    appState: { zoom: getZoom(printableArea) },
                }}
                onChange={onChangeCallback as any}
                UIOptions={{
                    canvasActions: {
                        changeViewBackgroundColor: true,
                        theme: true,
                        clearCanvas: false,
                        export: false,
                        loadScene: false,
                        saveAsImage: false,
                        saveToActiveFile: false,
                    },
                }}
            />
        </div>
    );
}

function getZoom(printableArea: Rectangle): Zoom {
    const printableAreaWidth =
        printableArea.bottomRightCorner.x - printableArea.topLeftCorner.x;
    const printableAreaHeight =
        printableArea.bottomRightCorner.y - printableArea.topLeftCorner.y;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Padding to account for interface elements
    const xPadding = 500;
    const yPadding = 100;
    const availableWidth = windowWidth - xPadding;
    const availableHeight = windowHeight - yPadding;
    const fittingXZoom = availableWidth / printableAreaWidth;
    const fittingYZoom = availableHeight / printableAreaHeight;
    const fittingZoom = Math.min(fittingXZoom, fittingYZoom);
    const xTranslation = (windowWidth - fittingZoom * printableAreaWidth) / 2;
    const yTranslation = (windowHeight - fittingZoom * printableAreaHeight) / 2;
    return {
        value: fittingZoom as any,
        translation: {
            x: xTranslation,
            y: yTranslation,
        },
    };
}
