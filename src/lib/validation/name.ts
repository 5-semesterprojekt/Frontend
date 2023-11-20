import { RuleObject } from 'antd/es/form';

import { asyncHandler } from './asyncHandler';

export const nameCharset: RuleObject = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (!/^[a-zæøåA-ZÆØÅ\\-\s]+$/.test(name)) {
        throw Error('Indeholder tegn som ikke er tilladte');
      }
    }, value || ''),
};

export const nameStartWithUppercase: RuleObject = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (name.length > 0 && name[0] !== name[0].toUpperCase()) {
        throw Error('Skal starte med stort');
      }
    }, value || ''),
};

export const nameDontWrapWithSpace: RuleObject = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (name.trim().length !== name.length) {
        throw Error('Ingen mellemrum i starten eller slutningen');
      }
    }, value || ''),
};

export const nameLength: RuleObject = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (name?.length < 2) {
        throw Error('Må ikke være kortere end 2 tegn');
      } else if (name?.length > 64) {
        throw Error('Må ikke være længere end 64 tegn');
      }
    }, value || ''),
};
