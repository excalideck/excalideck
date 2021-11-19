import { expect, Page, test } from "@playwright/test";
import { castArray, isEmpty } from "lodash";

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
            await this.page.click(
                '.InactiveViewInputRadioButton:has-text("Slides")'
            );
            await this.page.waitForSelector(
                '.ActiveViewInputRadioButton:has-text("Slides")'
            );
        });
    }

    async goToSettings() {
        await test.step("Go to Settings view", async () => {
            await this.page.click(
                '.InactiveViewInputRadioButton:has-text("Settings")'
            );
            await this.page.waitForSelector(
                '.ActiveViewInputRadioButton:has-text("Settings")'
            );
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
            await this.runAndWaitForSlideMiniaturesChange(async () => {
                await this.page.click('button[title*="add slide" i]');
            });
        });
    }

    async deleteSlide() {
        await test.step("Delete slide", async () => {
            await this.runAndWaitForSlideMiniaturesChange(async () => {
                this.page.once("dialog", async (dialog) => {
                    await dialog.accept();
                });
                await this.page.click('button[title*="delete slide" i]');
            });
        });
    }

    async selectSlide(index: number) {
        await test.step(`Select slide at index ${index}`, async () => {
            await this.page.click(
                `.SortableSlideMiniature:nth-child(${index + 1})`
            );
            await this.page.waitForSelector(
                `.SortableSlideMiniature:nth-child(${
                    index + 1
                }) .SelectedSlideMiniature`
            );
        });
    }

    async moveSlide(fromIndex: number, toIndex: number) {
        await test.step(
            `Move slide at index ${fromIndex} to index ${toIndex}`,
            async () => {
                await this.runAndWaitForSlideMiniaturesChange(async () => {
                    await this.page.dragAndDrop(
                        `.SortableSlideMiniature:nth-child(${fromIndex + 1})`,
                        `.SortableSlideMiniature:nth-child(${toIndex + 1})`,
                        { targetPosition: { x: 10, y: 10 } }
                    );
                });
            }
        );
    }

    async skipSlide() {
        await test.step("Skip slide", async () => {
            await this.page.click('button[title*="skip" i][aria-checked=true]');
            await this.page.waitForSelector(
                'button[title*="skip" i][aria-checked=false]'
            );
        });
    }

    async excludeCommonElementsForSlide() {
        await test.step("Exclude common elements for slide", async () => {
            await this.runAndWaitForSlideMiniaturesChange(async () => {
                await this.page.click(
                    'button[title*="include common elements" i][aria-checked=true]'
                );
                await this.page.waitForSelector(
                    'button[title*="include common elements" i][aria-checked=false]'
                );
            });
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
                await this.runAndWaitForSlideMiniaturesChange(async () => {
                    // Select the shape
                    await this.page.click(`[title*="${shape}" i]`);
                    // Configure it not to draw sloppy shapes, as they are
                    // random and produce visual diffs from one run to the other
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
                });
            }
        );
    }

    private get viewportSize(): { width: number; height: number } {
        const viewportSize = this.page.viewportSize();
        expect(viewportSize).not.toBeNull();
        return viewportSize!;
    }

    /**
     * Runs the supplied function and waits for slide miniatures to change.
     * Detected changes are:
     *
     * - one (or more) of the SlideMiniatureImage-s changes
     * - SlideMiniatures are re-arranged
     */
    private async runAndWaitForSlideMiniaturesChange(fn: () => Promise<void>) {
        function getCanvasTestids() {
            const canvases = window.document.querySelectorAll(
                ".SlideMiniatureImage canvas"
            );
            return [...canvases].map((canvas) =>
                canvas.getAttribute("data-testid")
            );
        }
        // The functions used below in .evaluate and .waitForFunction are
        // executed in the page context. That means that they don't have access
        // to the getCanvasTestids function defined in this method. For them to
        // be able to call the function, we therefore need to inject it - as a
        // global function - in the page context
        await this.page.addScriptTag({ content: String(getCanvasTestids) });

        // Get the initial canvas testid-s
        const initialCanvasTestids = await this.page.evaluate(() =>
            getCanvasTestids()
        );

        // Run the supplied function
        await fn();

        // If there are no canvas testid-s, i.e. no slide miniatures, it means
        // we're in the Settings view, so we don't need to wait for slide
        // miniatures to change
        if (isEmpty(initialCanvasTestids)) {
            return;
        }

        // Wait for the canvas testid-s to change (in some way)
        await this.page.waitForFunction((initialCanvasTestids) => {
            const currentCanvasTestids = getCanvasTestids();
            return (
                JSON.stringify(initialCanvasTestids) !==
                JSON.stringify(currentCanvasTestids)
            );
        }, initialCanvasTestids);
    }

    private nextAvailableSnapshotId = 0;
    private issueNextSnapshotName() {
        const resultName = `snapshot-${this.nextAvailableSnapshotId}.png`;
        this.nextAvailableSnapshotId += 1;
        return resultName;
    }
}
