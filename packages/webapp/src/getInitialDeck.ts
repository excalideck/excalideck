import { Deck } from "@excalideck/deck";

export default async function getInitialDeck(
    isHomepage: boolean
): Promise<Deck> {
    return isHomepage
        ? await import("./initialDecks/homepage.json")
        : (await import("./initialDecks/empty")).default;
}
