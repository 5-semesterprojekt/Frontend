import { Rule, RuleObject } from 'antd/es/form';

import { asyncHandler } from './asyncHandler';

export const required: Rule = {
  required: true,
  message: 'Påkrævet',
};

export function mustEqual(requirement: string): RuleObject {
  return {
    validator: (_, value: string) =>
      asyncHandler((text) => {
        if (text !== requirement) {
          throw Error('Stemmer ikke overens');
        }
      }, value || ''),
  };
}
