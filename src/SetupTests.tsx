import { vi } from 'vitest';
import { fetch } from 'cross-fetch';
import nock from 'nock';

import { organizationConfig } from '../config/organization';

import { User } from './auth/types/user';
import { backendUrl } from './lib/api';
import { setAccessToken } from './auth/service/tokens';

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

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

export const testUser: User = {
  firstName: 'Martin',
  lastName: 'Jensen',
  email: 'martin@test.dk',
  id: 'testId',
  orgId: [organizationConfig.id],
};

setAccessToken('testing-token');

nock(backendUrl)
  .persist()
  .get(`/users/${organizationConfig.id}/me`)
  .reply(200, testUser);
