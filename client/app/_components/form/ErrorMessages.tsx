interface ErrorMessagesProps {
  errors: string[];
}

export default function ErrorMessages({ errors }: ErrorMessagesProps) {
  if (errors.length === 0) return null;
  return (
    <div className="error-messages">
      Please check the following fields:
      <ul>
        {errors.map((error, index) => (
          <li key={index} className="error-message">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
