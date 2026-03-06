import { render, screen, fireEvent, act } from "@testing-library/react";
import { ShakeDetector } from "@/components/ShakeDetector";
import type { Beer } from "@/data/beers";

const firstBeer: Beer = {
  id: 101,
  name: "First Beer",
  brewery: "Alpha Brewery",
  style: "IPA",
  description: "First description",
  imageUrl: "https://example.com/first.jpg",
  abv: 6,
  ibu: 45,
  rating: 4.1,
  origin: "USA",
  color: "beer-gold",
};

const secondBeer: Beer = {
  id: 102,
  name: "Second Beer",
  brewery: "Beta Brewery",
  style: "Stout",
  description: "Second description",
  imageUrl: "https://example.com/second.jpg",
  abv: 7,
  ibu: 35,
  rating: 4.8,
  origin: "USA",
  color: "beer-stout",
};

const getRandomBeerMock = vi.fn<() => Beer>();

vi.mock("@/data/beers", async () => {
  const actual = await vi.importActual<typeof import("@/data/beers")>("@/data/beers");
  return {
    ...actual,
    getRandomBeer: getRandomBeerMock,
  };
});

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
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { ShakeDetector } from "./ShakeDetector";

const onShakeHandlers: Array<() => void> = [];

vi.mock("@/hooks/useShake", () => ({
  useShake: ({ onShake }: { onShake: () => void }) => {
    onShakeHandlers.push(onShake);
    return { isShaking: false };
  },
  simulateShake: vi.fn(),
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("@/hooks/useShake", () => ({
  useShake: () => ({ isShaking: false }),
  simulateShake: vi.fn(),
vi.mock("@/components/BeerCard", () => ({
  BeerCard: () => <div>beer card</div>,
}));

vi.mock("@/components/BeerDetail", () => ({
  BeerDetail: () => null,
}));

describe("ShakeDetector", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    getRandomBeerMock.mockReset();
    getRandomBeerMock.mockReturnValueOnce(firstBeer).mockReturnValueOnce(secondBeer);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('updates beer card when clicking desktop "Find New Beer" button', () => {
    render(<ShakeDetector />);

    expect(screen.getByText("First Beer")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /find new beer/i }));

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText("Second Beer")).toBeInTheDocument();
    expect(screen.queryByText("First Beer")).not.toBeInTheDocument();
    onShakeHandlers.length = 0;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("cleans pending transition timeout when unmounting", () => {
    const { unmount } = render(<ShakeDetector />);

    const latestOnShake = onShakeHandlers[onShakeHandlers.length - 1];
    expect(latestOnShake).toBeTypeOf("function");

    latestOnShake();

    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
    vi.runAllTimers();
  });
});
