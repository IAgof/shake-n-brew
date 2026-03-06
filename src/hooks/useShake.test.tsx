import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useShake } from "./useShake";

vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe("useShake", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("DeviceMotionEvent", class DeviceMotionEvent extends Event {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("cleans pending shake timeout on unmount", () => {
    const onShake = vi.fn();
    const { unmount } = renderHook(() => useShake({ onShake }));

    const event = new Event("devicemotion");
    Object.defineProperty(event, "accelerationIncludingGravity", {
      value: { x: 20, y: 20, z: 20 },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(onShake).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.runAllTimers();
    });
  });
});
