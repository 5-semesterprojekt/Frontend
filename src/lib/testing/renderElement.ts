import { render } from '@testing-library/react';
import React from 'react';

import AllProviders from '@/components/AllProviders';

export default function renderElement(element: React.ReactElement) {
  return render(element, { wrapper: AllProviders });
}
