import { describe, expect, test } from "bun:test";
import { getAccelerationDeltas } from "./useShake";

describe("getAccelerationDeltas", () => {
  test("does not discard acceleration when one axis is 0", () => {
    const result = getAccelerationDeltas(
      { x: 0, y: 12, z: -4 },
      { x: 8, y: 2, z: -10 }
    );

    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      x: 0,
      y: 12,
      z: -4,
      deltaX: 8,
      deltaY: 10,
      deltaZ: 6,
    });
  });

  test("returns null when any axis is null or undefined", () => {
    expect(
      getAccelerationDeltas(
        { x: null, y: 1, z: 2 },
        { x: 0, y: 0, z: 0 }
      )
    ).toBeNull();
  });
});
