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

vi.mock("@/components/BeerCard", () => ({
  BeerCard: () => <div>beer card</div>,
}));

vi.mock("@/components/BeerDetail", () => ({
  BeerDetail: () => null,
}));

describe("ShakeDetector", () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
