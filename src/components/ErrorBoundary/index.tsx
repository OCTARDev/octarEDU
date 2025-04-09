import React, { ReactNode } from 'react';
import Spinner from '../Spinner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ErrorBoundaryProps {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = React.memo(
  ({ children, isLoading, isError, error }) => {
    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      let errorMessage = 'Something went wrong';

      // Handle FetchBaseQueryError with a custom message from the response
      if ('status' in (error || {})) {
        const err = error as FetchBaseQueryError;
        errorMessage =
          (err.data as { message?: string })?.message ?? errorMessage;
      }

      // Handle SerializedError (e.g., runtime JS errors)
      if ('message' in (error || {})) {
        errorMessage = (error as SerializedError).message ?? errorMessage;
      }

      return (
        <div className="text-center my-10 font-bold capitalize">
          {errorMessage}
        </div>
      );
    }

    return <>{children}</>;
  }
);

ErrorBoundary.displayName = 'ErrorBoundary';

export default ErrorBoundary;
