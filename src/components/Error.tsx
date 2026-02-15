interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const Error = ({ 
  title = 'Oops! Something went wrong',
  message = 'An error occurred while loading the content. Please try again.',
  onRetry 
}: ErrorProps) => {
  return (
    <div className="error-container">
      <div className="error-container__content">
        <h2 className="error-container__title">{title}</h2>
        <p className="error-container__message">{message}</p>
        {onRetry && (
          <button 
            className="btn btn--action"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
