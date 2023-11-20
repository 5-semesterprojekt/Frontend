import { validationRule } from './validationRule';

export const nameCharset = validationRule((name) => {
  if (!/^[a-zæøåA-ZÆØÅ\\-\s]+$/.test(name)) {
    throw Error('Indeholder tegn som ikke er tilladte');
  }
});

export const nameStartWithUppercase = validationRule((name) => {
  if (name.length > 0 && name[0] !== name[0].toUpperCase()) {
    throw Error('Skal starte med stort');
  }
});

export const nameDontWrapWithSpace = validationRule((name) => {
  if (name.trim().length !== name.length) {
    throw Error('Ingen mellemrum i starten eller slutningen');
  }
});

export const nameLength = validationRule((name) => {
  if (name?.length < 2) {
    throw Error('Må ikke være kortere end 2 tegn');
  } else if (name?.length > 64) {
    throw Error('Må ikke være længere end 64 tegn');
  }
});
