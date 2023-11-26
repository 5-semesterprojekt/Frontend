import { describe, test, expect } from 'vitest';

import { emailFormat } from './email';

describe('E-mail validation', () => {
  describe('Length', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await emailFormat.validator({}, value);

    test('Allow martin@mail.dk', async () => {
      await expect(validator('martin@mail.dk')).resolves.toBeUndefined();
    });

    test('Disallow email without top level domain', async () => {
      await expect(validator('martin@mail')).rejects.toBeDefined();
    });

    test('Disallow email without domain', async () => {
      await expect(validator('martin@')).rejects.toBeDefined();
    });

    test('Disallow email without @ symbol', async () => {
      await expect(validator('martinmail.dk')).rejects.toBeDefined();
    });
  });
});
