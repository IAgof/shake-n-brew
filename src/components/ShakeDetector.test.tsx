import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ShakeDetector } from "./ShakeDetector";
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
const onShakeHandlers: Array<() => void> = [];

vi.mock("@/data/beers", async () => {
  const actual = await vi.importActual<typeof import("@/data/beers")>("@/data/beers");
  return {
    ...actual,
    getRandomBeer: getRandomBeerMock,
  };
});

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

describe("ShakeDetector", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    onShakeHandlers.length = 0;
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
  });

  it("cleans pending transition timeout when unmounting", () => {
    const { unmount } = render(<ShakeDetector />);

    const latestOnShake = onShakeHandlers[onShakeHandlers.length - 1];
    expect(latestOnShake).toBeTypeOf("function");

    latestOnShake();
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
