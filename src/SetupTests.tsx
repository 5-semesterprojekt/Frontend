import { vi } from 'vitest';

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
