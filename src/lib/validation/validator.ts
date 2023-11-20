import { RuleObject } from 'antd/es/form';

export const validator = (validationFunction: (value: string) => void) => ({
  validator: async (_: RuleObject, value: string) => {
    try {
      const reference = value || '';
      if (reference.length > 0) {
        validationFunction(reference);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
});
