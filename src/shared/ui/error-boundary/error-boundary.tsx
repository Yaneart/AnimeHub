import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            textAlign: "center",
          }}
        >
          <h2>Что-то пошло не так 😢</h2>
          <p>Попробуй обновить страницу</p>
          <button onClick={this.handleReload}>Обновить</button>
        </div>
      );
    }

    return this.props.children;
  }
}
