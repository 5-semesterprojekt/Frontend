import { validationRule } from './validationRule';

// https://emailregex.com/
const emailRegex = new RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const emailFormat = validationRule((email) => {
  if (!emailRegex.test(email)) {
    throw Error('E-mailen er ikke i korrekt format');
  }
});
