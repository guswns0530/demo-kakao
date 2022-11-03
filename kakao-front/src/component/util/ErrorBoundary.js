import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  }

  render() {
    const {hasError} = this.state
    const {fallback} = this.props;

    if (hasError) {
      return fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;