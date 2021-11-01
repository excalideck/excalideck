import { z } from "zod";

export default interface ExcalidrawElement {
    readonly id: string;
    readonly versionNonce: number;
    readonly [key: string]: any;
}

export const ExcalidrawElementSchema = z
    .object({
        id: z.string(),
        versionNonce: z.number(),
    })
    .passthrough();
