import { expect, Page, test } from "@playwright/test";
import { castArray } from "lodash";
import waitForChange from "./waitForChange";
import waitUntilStable from "./waitUntilStable";

export default class ExcalideckEditorPage {
    constructor(private page: Page) {}

    /*
     * Public API
     */

    async go() {
        await test.step("Go to Excalideck Editor test page", async () => {
            await this.page.goto("/");
        });
    }

    async goToSlides() {
        await test.step("Go to Slides view", async () => {
            await this.page.click("text=/slides/i");
            await this.waitForStableMiniatures();
        });
    }

    async goToSettings() {
        await test.step("Go to Settings view", async () => {
            await this.page.click("text=/settings/i");
        });
    }

    async drawRectangle() {
        await this.drawShape("rectangle");
    }

    async drawEllipse() {
        await this.drawShape("ellipse");
    }

    async drawDiamond() {
        await this.drawShape("diamond");
    }

    async addSlide() {
        await test.step("Add slide to the deck", async () => {
            await this.page.click('[title*="add slide" i]');
        });
    }

    async deleteSlide() {
        await test.step("Delete slide", async () => {
            this.page.once("dialog", async (dialog) => {
                await dialog.accept();
            });
            await this.page.click('button[title*="delete slide" i]');
        });
    }

    async selectSlide(index: number) {
        await test.step(`Select slide at index ${index}`, async () => {
            await this.page.click(
                `[data-testid^="SortableSlideMiniature" i]:nth-child(${
                    index + 1
                })`
            );
        });
    }

    async moveSlide(fromIndex: number, toIndex: number) {
        await test.step(
            `Move slide at index ${fromIndex} to index ${toIndex}`,
            async () => {
                await this.page.dragAndDrop(
                    `[data-testid^="SortableSlideMiniature" i]:nth-child(${
                        fromIndex + 1
                    })`,
                    `[data-testid^="SortableSlideMiniature" i]:nth-child(${
                        toIndex + 1
                    })`
                );
                await this.waitForStableMiniatures({
                    stableFor: 3 * 15,
                    timeout: 6 * 15,
                });
            }
        );
    }

    async skipSlide() {
        await test.step("Skip slide", async () => {
            // Throw an error if the slide is already skipped
            await expect(
                this.page.locator('button[title*="skip" i]')
            ).toHaveAttribute("aria-checked", "true");
            await this.page.click('button[title*="skip" i]');
        });
    }

    async excludeCommonElementsForSlide() {
        await test.step("Exclude common elements for slide", async () => {
            // Throw an error if common elements are already excluded
            await expect(
                this.page.locator('button[title*="include common elements" i]')
            ).toHaveAttribute("aria-checked", "true");
            await this.page.click('button[title*="include common elements" i]');
            await this.waitForNextMiniaturesUpdate();
        });
    }

    async changePrintableArea(width: number, height: number) {
        await test.step(
            `Change printable area to have width ${width} and height ${height}`,
            async () => {
                await this.page.fill(
                    'input[aria-label*="width" i]',
                    String(width)
                );
                await this.page.fill(
                    'input[aria-label*="height" i]',
                    String(height)
                );
            }
        );
    }

    async expectToSee(...expectations: string[]) {
        const stepTitle = [
            "Expect to see:",
            castArray(expectations)
                .map((expectation) => `${expectation}`)
                .join(", "),
        ].join(" ");
        await test.step(stepTitle, async () => {
            expect(await this.page.screenshot()).toMatchSnapshot(
                this.issueNextSnapshotName()
            );
        });
    }

    /*
     * Private API
     */

    private async drawShape(shape: "rectangle" | "ellipse" | "diamond") {
        await test.step(
            `Draw ${shape} in the middle of the drawing area`,
            async () => {
                // Select the shape
                await this.page.click(`[title*="${shape}" i]`);
                // Configure it not to draw sloppy shapes, as they are random
                // and produce visual diffs from one run to the other
                await this.page.click('[title*="architect" i]');
                // Fill it to make it more visible
                await this.page.fill(
                    'input[aria-label="background" i]',
                    "000000"
                );
                await this.page.click('[title*="solid" i]');
                // Draw the shape
                const initialX = this.viewportSize.width / 2 - 100;
                const initialY = this.viewportSize.height / 2 - 50;
                await this.page.mouse.move(initialX, initialY);
                await this.page.mouse.down();
                await this.page.mouse.move(initialX + 200, initialY + 100);
                await this.page.mouse.up();
                // Wait for the miniatures to update
                await this.waitForNextMiniaturesUpdate();
            }
        );
    }

    private get viewportSize(): { width: number; height: number } {
        const viewportSize = this.page.viewportSize();
        expect(viewportSize).not.toBeNull();
        return viewportSize!;
    }

    /**
     * Waits for miniatures to be updated. If miniatures aren't updated within
     * `options.timeout` milliseconds, the method fails.
     */
    private async waitForNextMiniaturesUpdate(options = { timeout: 1_000 }) {
        const slideMiniaturesHandle = await this.page.$(
            '[data-testid="SlidesControl"]'
        );
        if (slideMiniaturesHandle !== null) {
            // We're in the Slides view, where there are miniatures
            await slideMiniaturesHandle!.evaluate(waitForChange, options);
        }
    }

    /**
     * Waits for miniatures to be stable, i.e. not changed for at least
     * `options.stableFor` milliseconds. If miniatures don't stabilize within
     * `options.timeout` milliseconds, the method fails.
     */
    private async waitForStableMiniatures(
        options = { stableFor: 1_000, timeout: 10_000 }
    ) {
        const slideMiniaturesHandle = await this.page.$(
            '[data-testid="SlidesControl"]'
        );
        expect(slideMiniaturesHandle).not.toBeNull();
        await slideMiniaturesHandle!.evaluate(waitUntilStable, options);
    }

    private nextAvailableSnapshotId = 0;
    private issueNextSnapshotName() {
        const resultName = `snapshot-${this.nextAvailableSnapshotId}.png`;
        this.nextAvailableSnapshotId += 1;
        return resultName;
    }
}
