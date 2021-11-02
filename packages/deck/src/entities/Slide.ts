import { z } from "zod";
import { ExcalidrawElement } from "..";
import { ExcalidrawElementSchema } from "./ExcalidrawElement";

export default interface Slide {
    readonly id: string;
    readonly shouldRender: boolean;
    readonly shouldRenderWithCommonExcalidrawElements: boolean;
    readonly excalidrawElements: ExcalidrawElement[];
}

export const SlideSchema = z
    .object({
        id: z.string(),
        shouldRender: z.boolean(),
        shouldRenderWithCommonExcalidrawElements: z.boolean(),
        excalidrawElements: z.array<z.ZodType<ExcalidrawElement>>(
            ExcalidrawElementSchema
        ),
    })
    .strict();
