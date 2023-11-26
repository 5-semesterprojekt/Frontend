import { describe, test, expect } from 'vitest';

import {
  nameCharset,
  nameDontWrapWithSpace,
  nameLength,
  nameStartWithUppercase,
} from './name';

describe('Name validation', () => {
  describe('Capitalization', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameStartWithUppercase.validator({}, value);

    test('Allow name that with beginning capital letter', async () => {
      await expect(validator('Martin')).resolves.toBeUndefined();
    });

    test('Disallow name with no capital letter', async () => {
      await expect(validator('martin')).rejects.toBeDefined();
    });

    test('Disallow name with a capital letter in the middle', async () => {
      await expect(validator('mArtin')).rejects.toBeDefined();
    });
  });

  describe('Charset', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameCharset.validator({}, value);

    test('Allow Danish letters', async () => {
      await expect(
        validator('abcdefghijklmnopqrstuvwxyzæøå'),
      ).resolves.toBeUndefined();
      await expect(
        validator('ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'),
      ).resolves.toBeUndefined();
    });

    test('Allow dash in a name', async () => {
      await expect(validator('Hansen-Jensen')).resolves.toBeUndefined();
    });

    test("Disallow symbol (') in a name", async () => {
      await expect(validator("Martin's navn")).rejects.toBeDefined();
    });
  });

  describe('Length', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameLength.validator({}, value);

    test('Allow name with a length between 2 and 64', async () => {
      await expect(validator('Martin')).resolves.toBeUndefined();
    });

    test('Disallow name shorter than 2', async () => {
      await expect(validator('X')).rejects.toBeDefined();
    });

    test('Disallow name longer than 64', async () => {
      await expect(
        validator(
          'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestX',
        ),
      ).rejects.toBeDefined();
    });
  });

  describe('Spacing', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameDontWrapWithSpace.validator({}, value);

    test('Allow name without spaces', async () => {
      await expect(validator('Hans')).resolves.toBeUndefined();
    });

    test('Allow names with spacing', async () => {
      await expect(validator('Hans Erik')).resolves.toBeUndefined();
    });

    test('Disallow space before name', async () => {
      await expect(validator(' Martin')).rejects.toBeDefined();
    });

    test('Disallow space after name', async () => {
      await expect(validator('Martin ')).rejects.toBeDefined();
    });
  });
});
