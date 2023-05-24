import { describe, expect, test } from 'vitest';
import { MathHelper } from '../../../src/v1/shared/utils/math';

describe('MathHelper', () => {
  test('should return the mode of an number array', () => {
    const numbers = [1, 1, 2, 3, 4, 5, 2]
    const expectedMode = [1,2]

    const modes = MathHelper.getMode(numbers)

    expect(modes).toEqual(expectedMode)
  });
});