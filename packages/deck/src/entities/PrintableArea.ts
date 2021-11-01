import { z } from "zod";

export default interface PrintableArea {
    readonly width: number;
    readonly height: number;
}

export const PrintableAreaSchema = z
    .object({
        width: z.number().int().positive(),
        height: z.number().int().positive(),
    })
    .strict();
