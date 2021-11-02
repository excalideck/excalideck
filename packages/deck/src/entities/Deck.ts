import { z } from "zod";
import ExcalidrawElement, {
    ExcalidrawElementSchema,
} from "./ExcalidrawElement";
import PrintableArea, { PrintableAreaSchema } from "./PrintableArea";
import Slide, { SlideSchema } from "./Slide";

export default interface Deck {
    readonly printableArea: PrintableArea;
    readonly commonExcalidrawElements: ExcalidrawElement[];
    readonly slides: Slide[];
}

export const DeckSchema = z.object({
    printableArea: PrintableAreaSchema,
    commonExcalidrawElements: z.array(ExcalidrawElementSchema),
    slides: z.array(SlideSchema).min(1),
});
