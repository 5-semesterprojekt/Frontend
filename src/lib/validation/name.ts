import { validator } from './validator';

export const nameCharset = validator((name) => {
  if (!/^[a-zæøåA-ZÆØÅ\\-\s]+$/.test(name)) {
    throw Error('Indeholder tegn som ikke er tilladte');
  }
});

export const nameStartWithUppercase = validator((name) => {
  if (name.length > 0 && name[0] !== name[0].toUpperCase()) {
    throw Error('Skal starte med stort');
  }
});

export const nameDontWrapWithSpace = validator((name) => {
  if (name.trim().length !== name.length) {
    throw Error('Ingen mellemrum i starten eller slutningen');
  }
});

export const nameLength = validator((name) => {
  if (name?.length < 2) {
    throw Error('Må ikke være kortere end 2 tegn');
  } else if (name?.length > 64) {
    throw Error('Må ikke være længere end 64 tegn');
  }
});
