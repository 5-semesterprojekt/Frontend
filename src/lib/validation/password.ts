import { Rule } from 'antd/es/form';

import { asyncHandler } from './asyncHandler';

export const passwordCommonNotAllowed: Rule = {
  validator: (_, value: string) =>
    asyncHandler((password) => {
      if (commonPasswords100.includes(password)) {
        throw Error('Denne adgangskode er blandt de 100 mest anvendte');
      }
      return true;
    }, value),
};

export const passwordLength: Rule = {
  validator: (_, value: string) =>
    asyncHandler((password) => {
      if (password.length < 8) {
        throw Error('Må ikke være kortere end 8 tegn');
      } else if (password.length > 64) {
        throw Error('Må ikke være længere end 64 tegn');
      }
      return true;
    }, value),
};

const commonPasswords100 = [
  '123456',
  'password',
  '12345678',
  'qwerty',
  '123456789',
  '12345',
  '1234',
  '111111',
  '1234567',
  'dragon',
  '123123',
  'baseball',
  'abc123',
  'football',
  'monkey',
  'letmein',
  '696969',
  'shadow',
  'master',
  '666666',
  'qwertyuiop',
  '123321',
  'mustang',
  '1234567890',
  'michael',
  '654321',
  'pussy',
  'superman',
  '1qaz2wsx',
  '7777777',
  'fuckyou',
  '121212',
  '000000',
  'qazwsx',
  '123qwe',
  'killer',
  'trustno1',
  'jordan',
  'jennifer',
  'zxcvbnm',
  'asdfgh',
  'hunter',
  'buster',
  'soccer',
  'harley',
  'batman',
  'andrew',
  'tigger',
  'sunshine',
  'iloveyou',
  'fuckme',
  '2000',
  'charlie',
  'robert',
  'thomas',
  'hockey',
  'ranger',
  'daniel',
  'starwars',
  'klaster',
  '112233',
  'george',
  'asshole',
  'computer',
  'michelle',
  'jessica',
  'pepper',
  '1111',
  'zxcvbn',
  '555555',
  '11111111',
  '131313',
  'freedom',
  '777777',
  'pass',
  'fuck',
  'maggie',
  '159753',
  'aaaaaa',
  'ginger',
  'princess',
  'joshua',
  'cheese',
  'amanda',
  'summer',
  'love',
  'ashley',
  '6969',
  'nicole',
  'chelsea',
  'biteme',
  'matthew',
  'access',
  'yankees',
  '987654321',
  'dallas',
  'austin',
  'thunder',
  'taylor',
  'matrix',
  'minecraft',
];