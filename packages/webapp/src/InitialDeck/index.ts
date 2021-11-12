import { Deck } from "@excalideck/deck";

const InitialDeck = {
    async get(isHomepage: boolean): Promise<Deck> {
        return isHomepage
            ? await import("./homepage.json")
            : (await import("./empty")).default;
    },
};
export default InitialDeck;
