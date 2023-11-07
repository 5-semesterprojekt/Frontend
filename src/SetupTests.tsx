import { vi } from 'vitest';
import { fetch } from 'cross-fetch';

global.fetch = fetch;

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };
