import React from "react";
import { beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";

const mockBeer = {
  id: 999,
  name: "Test Beer",
  brewery: "Test Brewery",
  style: "IPA",
  description: "Test description",
  imageUrl: "https://example.com/beer.jpg",
  abv: 5.5,
  ibu: 30,
  rating: 4.2,
  origin: "Test Origin",
  color: "beer-gold",
};

const getRandomBeer = mock(() => mockBeer);

mock.module("@/data/beers", () => ({
  getRandomBeer,
}));

mock.module("@/hooks/useShake", () => ({
  useShake: () => ({ isShaking: false }),
  simulateShake: () => undefined,
}));

mock.module("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

mock.module("@/components/BeerCard", () => ({
  BeerCard: () => null,
}));

mock.module("@/components/BeerDetail", () => ({
  BeerDetail: () => null,
}));

mock.module("@/components/ui/button", () => ({
  Button: () => null,
}));

mock.module("lucide-react", () => ({
  Smartphone: () => null,
  RefreshCw: () => null,
}));

const hookState: unknown[] = [];
let hookIndex = 0;

const createDispatcher = () => ({
  useState(initialState: unknown | (() => unknown)) {
    const currentIndex = hookIndex++;

    if (hookState[currentIndex] === undefined) {
      hookState[currentIndex] =
        typeof initialState === "function"
          ? (initialState as () => unknown)()
          : initialState;
    }

    const setState = (nextState: unknown | ((previousState: unknown) => unknown)) => {
      hookState[currentIndex] =
        typeof nextState === "function"
          ? (nextState as (previousState: unknown) => unknown)(hookState[currentIndex])
          : nextState;
    };

    return [hookState[currentIndex], setState] as const;
  },
  useEffect() {},
});

const internals = (React as unknown as {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentDispatcher: { current: unknown };
  };
}).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

const mount = () => {
  hookState.length = 0;
  hookIndex = 0;
  internals.ReactCurrentDispatcher.current = createDispatcher();
};

const rerender = () => {
  hookIndex = 0;
  internals.ReactCurrentDispatcher.current = createDispatcher();
};

let ShakeDetector: (typeof import("./ShakeDetector"))["ShakeDetector"];

beforeAll(async () => {
  ({ ShakeDetector } = await import("./ShakeDetector"));
});

beforeEach(() => {
  getRandomBeer.mockClear();
  mount();
});

describe("ShakeDetector", () => {
  it("obtiene la cerveza inicial una sola vez al montar y no en re-render", () => {
    ShakeDetector();
    expect(getRandomBeer).toHaveBeenCalledTimes(1);

    rerender();
    ShakeDetector();
    expect(getRandomBeer).toHaveBeenCalledTimes(1);
  });
});
