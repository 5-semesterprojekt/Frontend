import { screen, render, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import ErrorBoundary from './ErrorBoundary';

import { AuthorizationError } from '@/auth/types/authorization-error';
import AuthorizationErrorBoundary from '@/auth/components/AuthorizationErrorBoundary';

describe('Error Boundary', () => {
  test('it can render when no error is thrown', async () => {
    const text = 'Test';

    render(<ErrorBoundary>{text}</ErrorBoundary>);

    await waitFor(() => {
      expect(screen.getByText(text)).toBeDefined();
    });
  });

  test('it can catch an error and render the fallback', async () => {
    render(
      <ErrorBoundary fallback="Caught">
        <Throw a={new Error()} />
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(() => screen.getByText('Caught')).toBeDefined();
    });
  });
});

describe('Authorization Error Boundary', () => {
  test('it can render when no error is thrown', async () => {
    const text = 'Test';

    render(<AuthorizationErrorBoundary>{text}</AuthorizationErrorBoundary>);

    await waitFor(() => {
      expect(screen.getByText(text)).toBeDefined();
    });
  });

  const normalError = 'Normal error!';
  const authorizationError = 'Authorization error!';

  test('it will let through normal errors', async () => {
    render(
      <ErrorBoundary fallback={normalError}>
        <AuthorizationErrorBoundary fallback={authorizationError}>
          <Throw a={new Error()} />
        </AuthorizationErrorBoundary>
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(() => screen.getByText(normalError)).toBeDefined();
      expect(() => screen.getByText(authorizationError)).toThrow();
    });
  });

  test('it will catch authorization errors', async () => {
    render(
      <ErrorBoundary fallback={normalError}>
        <AuthorizationErrorBoundary fallback={authorizationError}>
          <Throw a={new AuthorizationError()} />
        </AuthorizationErrorBoundary>
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(() => screen.getByText(normalError)).toThrow();
      expect(() => screen.getByText(authorizationError)).toBeDefined();
    });
  });
});

function Throw({ a }: { a: Error }) {
  throw a;
  return <></>;
}
