import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center border border-rose-500 mb-6 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <AlertTriangle className="w-12 h-12 text-rose-400" />
          </div>
          <h1 className="text-3xl font-black mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400 uppercase">
            System Error
          </h1>
          <div className="bg-white/5 border border-rose-500/30 rounded-xl p-4 max-w-md w-full mb-8 text-left overflow-auto max-h-64 shadow-inner">
            <p className="text-rose-300 font-mono text-sm font-bold mb-2 break-all">
              {this.state.error && this.state.error.toString()}
            </p>
            <pre className="text-slate-400 font-mono text-xs overflow-x-auto">
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-500 transition-colors rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_rgba(244,63,94,0.4)]"
          >
            <RefreshCcw className="w-5 h-5" />
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
