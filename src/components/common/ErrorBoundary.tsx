
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 text-destructive">
          <AlertTriangle className="h-full w-full" />
        </div>
        <CardTitle>Unerwarteter Fehler</CardTitle>
        <CardDescription>
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <details className="text-sm text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground">
            Technische Details
          </summary>
          <pre className="mt-2 whitespace-pre-wrap break-all text-xs">
            {error.message}
          </pre>
        </details>
        <Button onClick={resetError} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Seite neu laden
        </Button>
      </CardContent>
    </Card>
  </div>
);

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
      // Send to error tracking service (e.g., Sentry)
      console.error("Production error:", { error, errorInfo });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const ErrorFallback = this.props.fallback || DefaultErrorFallback;
      return <ErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}
