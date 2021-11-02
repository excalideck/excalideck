import { Deck, DeckOperations } from "@excalideck/deck";
import { pngBlobSlideRenderer } from "@excalideck/slide-renderers";
import type { PDFTextField } from "pdf-lib";
import ExcalideckFileNotValid from "./errors/ExcalideckFileNotValid";

const PDF_FIELD_NAME = "excalideckDeckJson";

const ExcalideckFile = {
    extension: ".pdf",

    mimeType: "application/vdn.excalideck+pdf",

    async getDeckFromFile(file: File): Promise<Deck> {
        const { PDFDocument } = await import("pdf-lib");
        const deckPDFDocument = await PDFDocument.load(
            await file.arrayBuffer()
        );

        const deckJSONString = (
            deckPDFDocument.getForm().getField(PDF_FIELD_NAME) as PDFTextField
        ).getText();

        if (!deckJSONString) {
            throw new ExcalideckFileNotValid();
        }

        let deck: unknown;
        try {
            deck = JSON.parse(deckJSONString);
        } catch {
            throw new ExcalideckFileNotValid();
        }

        return DeckOperations.parse(deck);
    },

    // TODO: increase output quality
    async getBlobFromDeck(deck: Deck): Promise<Blob> {
        const { width, height } = deck.printableArea;

        const { PDFDocument } = await import("pdf-lib");
        const deckPDFDocument = await PDFDocument.create();
        for (const slide of deck.slides) {
            if (!slide.shouldRender) {
                continue;
            }
            const slidePage = deckPDFDocument.addPage([width, height]);
            const slidePngBlob = await pngBlobSlideRenderer.renderSlide(
                deck,
                slide.id
            );
            const slidePngImage = await deckPDFDocument.embedPng(
                await slidePngBlob.arrayBuffer()
            );
            slidePage.drawImage(slidePngImage, { x: 0, y: 0, width, height });
        }

        const deckJSONString = JSON.stringify(deck);
        deckPDFDocument
            .getForm()
            .createTextField(PDF_FIELD_NAME)
            .setText(deckJSONString);

        const deckPdf = await deckPDFDocument.save();
        return new Blob([deckPdf], { type: ExcalideckFile.mimeType });
    },
};
export default ExcalideckFile;
