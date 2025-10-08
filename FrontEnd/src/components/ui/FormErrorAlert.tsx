type FormErrorProps = {
  message: string;
};

export default function FormErrorAlert({ message }: FormErrorProps) {
  return (
    <div className="flex items-center gap-2 rounded-md my-5 border border-red-300 bg-red-50 p-3 text-red-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 flex-shrink-0 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
