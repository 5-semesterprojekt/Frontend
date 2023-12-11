import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: {
    hasError: boolean;
  } = {
    hasError: false,
  };

  // eslint-disable-next-line
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render() {
    return this.state.hasError
      ? this.props.fallback || <></>
      : this.props.children;
  }
}

export default ErrorBoundary;
