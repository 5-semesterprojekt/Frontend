import ErrorBoundary from '../../components/ErrorBoundary';

import { AuthorizationError } from '@/auth/types/authorization-error';

class AuthorizationErrorBoundary extends ErrorBoundary {
  public componentDidCatch(error: Error) {
    if (!(error instanceof AuthorizationError)) {
      throw error;
    }
  }
}

export default AuthorizationErrorBoundary;
