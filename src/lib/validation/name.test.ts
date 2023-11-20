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

    test('Succeeds with beginning capital letter', async () => {
      await expect(validator('Martin')).resolves.toBeUndefined();
    });

    test('Fails with no capital letters', async () => {
      await expect(validator('martin')).rejects.toBeDefined();
    });

    test('Fails when letter other than first is capital', async () => {
      await expect(validator('mArtin')).rejects.toBeDefined();
    });
  });

  describe('Charset', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameCharset.validator({}, value);

    test('Allows Danish letters', async () => {
      await expect(
        validator('abcdefghijklmnopqrstuvwxyzæøå'),
      ).resolves.toBeUndefined();
    });

    test('Allows dash', async () => {
      await expect(validator('Hansen-Jensen')).resolves.toBeUndefined();
    });

    test('Disallows symbols', async () => {
      await expect(validator("Martin's navn")).rejects.toBeDefined();
    });
  });

  describe('Length', () => {
    const validator = async (
      value: string, // @ts-ignore
    ) => await nameLength.validator({}, value);

    test('Allows length between 2 and 64', async () => {
      await expect(validator('Martin')).resolves.toBeUndefined();
    });

    test('Disallows shorter than 2', async () => {
      await expect(validator('X')).rejects.toBeDefined();
    });

    test('Disallows longer than 64', async () => {
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

    test('Allows name without spaces', async () => {
      await expect(validator('Martin')).resolves.toBeUndefined();
    });

    test('Allows names with spacing', async () => {
      await expect(validator('Martin Jensen')).resolves.toBeUndefined();
    });

    test('Disallows space before name', async () => {
      await expect(validator(' Martin')).rejects.toBeDefined();
    });

    test('Disallows space after name', async () => {
      await expect(validator('Martin ')).rejects.toBeDefined();
    });
  });
});
