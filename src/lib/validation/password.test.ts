import { passwordCommonNotAllowed, passwordLength } from './password';

describe('Password validation', () => {
  describe('Length', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await passwordLength.validator({}, value);

    test('Allows length between 8 and 64', async () => {
      await expect(validator('Password')).resolves.toBeUndefined();
    });

    test('Disallows shorter than 8', async () => {
      await expect(validator('TestTes')).rejects.toBeDefined();
    });

    test('Disallows longer than 64', async () => {
      await expect(
        validator(
          'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestX',
        ),
      ).rejects.toBeDefined();
    });
  });

  describe('Check for common', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await passwordCommonNotAllowed.validator({}, value);

    test("Disallow 'password' as a password", async () => {
      await expect(validator('password')).rejects.toBeDefined();
    });
  });
});
