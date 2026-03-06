import { beers, getRandomBeer } from "@/data/beers";

describe("getRandomBeer", () => {
  it("returns a beer from the beers array and never undefined", () => {
    for (let i = 0; i < 25; i += 1) {
      const beer = getRandomBeer();

      expect(beer).toBeDefined();
      expect(beers).toContainEqual(beer);
    }
  });
});
