import { emailFormat } from './email';

describe('E-mail validation', () => {
  describe('Length', () => {
    const validator = async (value: string) =>
      await emailFormat.validator!({}, value, () => undefined);

    test('Allow martin@mail.dk', async () => {
      await expect(validator('martin@mail.dk')).resolves.toBeUndefined();
    });

    test('Disallow without top level domain', async () => {
      await expect(validator('martin@mail')).rejects.toBeDefined();
    });

    test('Disallow without domain', async () => {
      await expect(validator('martin@')).rejects.toBeDefined();
    });

    test('Disallow without @ symbol', async () => {
      await expect(validator('martinmail.dk')).rejects.toBeDefined();
    });
  });
});
