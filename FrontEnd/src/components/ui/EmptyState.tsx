// components/EmptyState.tsx
type EmptyStateProps = {
	title?: string;
	message?: string;
	icon?: React.ReactNode;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
};

export default function EmptyState({
	title = "No records found",
	message = "We couldn’t find any data here yet. Try adjusting your filters or add a new record.",
	icon,
	actionLabel = "Retry",
	onAction,
	className = "",
}: EmptyStateProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center shadow-sm ${className}`}
		>
			<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
				{icon ?? (
					<svg
						viewBox="0 0 24 24"
						className="h-7 w-7 text-gray-400"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 7h18M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M9 7V5a3 3 0 0 1 6 0v2"
						/>
					</svg>
				)}
			</div>

			<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
			<p className="mt-1 max-w-md text-sm text-gray-500">{message}</p>

			{actionLabel && onAction && (
				<button
					onClick={onAction}
					className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
				>
					<svg
						viewBox="0 0 24 24"
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 5v14M5 12h14"
						/>
					</svg>
					{actionLabel}
				</button>
			)}
		</div>
	);
}
