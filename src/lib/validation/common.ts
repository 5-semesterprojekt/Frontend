import { Rule } from 'antd/es/form';

import { validationRule } from './validationRule';

export const required: Rule = {
  required: true,
  message: 'Påkrævet',
};

export const mustEqual = (requirement: string) =>
  validationRule((text) => {
    if (text !== requirement) {
      throw Error('Stemmer ikke overens');
    }
  });
