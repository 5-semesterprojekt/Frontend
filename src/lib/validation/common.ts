import { Rule } from 'antd/es/form';

import { validator } from './validator';

export const required: Rule = {
  required: true,
  message: 'Påkrævet',
};

export const mustEqual = (requirement: string) =>
  validator((text) => {
    if (text !== requirement) {
      throw Error('Stemmer ikke overens');
    }
  });
