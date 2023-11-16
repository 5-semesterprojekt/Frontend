import { Rule } from 'antd/es/form';

import { asyncHandler } from './asyncHandler';

export const nameCharset: Rule = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (/[^a-zæøåA-ZÆØÅ\-\s]+/.test(name)) {
        throw Error('Indeholder tegn som ikke er tilladte');
      }
      return true;
    }, value),
};

export const nameLength: Rule = {
  validator: (_, value: string) =>
    asyncHandler((name) => {
      if (name.length < 2) {
        throw Error('Må ikke være kortere end 2 tegn');
      }else if (name.length > 64) {
        throw Error('Må ikke være længere end 64 tegn');
      }
      return true;
    }, value),
};
