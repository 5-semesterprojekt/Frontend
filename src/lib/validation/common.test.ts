import { describe, test, expect } from 'vitest';

import { mustEqual } from './common';

const reference = 'Test';

describe('Common validation', () => {
  describe('Must equal', () => {
    const validator = async (value: string) =>
      await mustEqual(reference).validator!({}, value, () => undefined);

    test('Allow the reference value', async () => {
      await expect(validator(reference)).resolves.toBeUndefined();
    });

    test('Disallow all lowercase version', async () => {
      await expect(validator(reference.toLowerCase())).rejects.toBeDefined();
    });

    test('Disallow all uppercase version', async () => {
      await expect(validator(reference.toUpperCase())).rejects.toBeDefined();
    });

    test('Disallow a completely different value', async () => {
      await expect(validator('different')).rejects.toBeDefined();
    });
  });
});
